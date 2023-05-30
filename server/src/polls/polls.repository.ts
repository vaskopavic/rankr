import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { IORedisKey } from 'src/redis.module';
import {
  AddNominationData,
  AddParticipantData,
  AddParticipantRankingsData,
  CreatePollData,
} from './types';
import { Poll } from 'shared';

@Injectable()
export class PollsRepository {
  private readonly ttl: string;
  private readonly logger = new Logger(PollsRepository.name);

  constructor(
    configService: ConfigService,
    @Inject(IORedisKey) private readonly redisClient: Redis,
  ) {
    this.ttl = configService.get<string>('POLL_DURATION');
  }
  async createPoll({
    votesPerUser,
    topic,
    pollId,
    userId,
  }: CreatePollData): Promise<Poll> {
    const initialPoll = {
      id: pollId,
      topic,
      votesPerUser,
      participants: {},
      nominations: {},
      rankings: {},
      adminId: userId,
      hasStarted: false,
    };

    this.logger.log(
      `Creating new poll: ${JSON.stringify(initialPoll, null, 2)} with TTL ${
        this.ttl
      }`,
    );

    const key = `polls:${pollId}`;

    try {
      await this.redisClient
        .multi([
          ['send_command', 'JSON.SET', key, '.', JSON.stringify(initialPoll)],
          ['expire', key, this.ttl],
        ])
        .exec();
      return initialPoll;
    } catch (error) {
      this.logger.error(
        `Failed to add poll ${JSON.stringify(initialPoll)}\n${error}`,
      );
      throw new InternalServerErrorException();
    }
  }

  async getPoll(pollId: string): Promise<Poll> {
    this.logger.log(`Attempting to get pollId: ${pollId}`);

    const key = `polls:${pollId}`;

    try {
      const currentPoll = await this.redisClient.send_command(
        'JSON.GET',
        key,
        '.',
      );

      this.logger.verbose(currentPoll);

      return JSON.parse(currentPoll);
    } catch (error) {
      this.logger.error(`Failed to get pollId ${pollId}`);
      throw new InternalServerErrorException(`Failed to get pollID ${pollId}`);
    }
  }

  async addParticipant({
    pollId,
    userId,
    username,
  }: AddParticipantData): Promise<Poll> {
    this.logger.log(
      `Attempting to add a participant with userId/username: ${userId}/${username} to pollId: ${pollId}`,
    );

    const key = `polls:${pollId}`;
    const participantPath = `.participants.${userId}`;

    try {
      await this.redisClient.send_command(
        'JSON.SET',
        key,
        participantPath,
        JSON.stringify(username),
      );

      return this.getPoll(pollId);
    } catch (e) {
      this.logger.error(
        `Failed to add a participant with userId/username: ${userId}/${username} to pollId: ${pollId}`,
      );
      throw new InternalServerErrorException(
        `Failed to add a participant with userId/username: ${userId}/${username} to pollId: ${pollId}`,
      );
    }
  }

  async removeParticipant(pollId: string, userId: string): Promise<Poll> {
    this.logger.log(`Removing userId: ${userId} from poll: ${pollId}`);

    const key = `polls:${pollId}`;
    const participantPath = `.participants.${userId}`;

    try {
      await this.redisClient.send_command('JSON.DEL', key, participantPath);

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(
        `Failed to remove userId: ${userId} from poll: ${pollId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to remove participant');
    }
  }

  async addNomination({
    pollId,
    nominationId,
    nomination,
  }: AddNominationData): Promise<Poll> {
    this.logger.log(
      `Attempting to add a nomination with nominationId/nomination: ${nominationId}/${nomination.text} to pollId: ${pollId}`,
    );

    const key = `polls:${pollId}`;
    const nominationPath = `.nominations.${nominationId}`;

    try {
      await this.redisClient.send_command(
        'JSON.SET',
        key,
        nominationPath,
        JSON.stringify(nomination),
      );

      return this.getPoll(pollId);
    } catch (e) {
      this.logger.error(
        `Failed to add a nomination with nominationId/text: ${nominationId}/${nomination.text} to pollId: ${pollId}`,
        e,
      );
      throw new InternalServerErrorException(
        `Failed to add a nomination with nominationID/text: ${nominationId}/${nomination.text} to pollId: ${pollId}`,
      );
    }
  }

  async removeNomination(pollId: string, nominationId: string): Promise<Poll> {
    this.logger.log(
      `Removing nominationId: ${nominationId} from poll: ${pollId}`,
    );

    const key = `polls:${pollId}`;
    const nominationPath = `.nominations.${nominationId}`;

    try {
      await this.redisClient.send_command('JSON.DEL', key, nominationPath);

      return this.getPoll(pollId);
    } catch (e) {
      this.logger.error(
        `Failed to remove nominationId: ${nominationId} from poll: ${pollId}`,
        e,
      );

      throw new InternalServerErrorException(
        `Failed to remove nominationId: ${nominationId} from poll: ${pollId}`,
      );
    }
  }

  async startPoll(pollId: string): Promise<Poll> {
    this.logger.log(`setting hasStarted for poll: ${pollId}`);

    const key = `polls:${pollId}`;

    try {
      await this.redisClient.send_command(
        'JSON.SET',
        key,
        '.hasStarted',
        JSON.stringify(true),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(`Failed set hasStarted for poll: ${pollId}`, error);
      throw new InternalServerErrorException(
        'The was an error starting the poll',
      );
    }
  }

  async addParticipantRankings({
    pollId,
    userId,
    rankings,
  }: AddParticipantRankingsData): Promise<Poll> {
    this.logger.log(
      `Attempting to add rankings for userId: ${userId} to pollId: ${pollId}`,
      rankings,
    );

    const key = `polls:${pollId}`;
    const rankingsPath = `.rankings.${userId}`;

    try {
      await this.redisClient.send_command(
        'JSON.SET',
        key,
        rankingsPath,
        JSON.stringify(rankings),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(
        `Failed to add a rankings for userId: ${userId} to pollId: ${pollId}`,
        rankings,
      );
      throw new InternalServerErrorException(
        'There was an error starting the poll',
      );
    }
  }
}
