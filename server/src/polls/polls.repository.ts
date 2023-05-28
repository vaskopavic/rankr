import { InternalServerErrorException } from '@nestjs/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { IORedisKey } from 'src/redis.module';
import { AddParticipantData, CreatePollData } from './types';
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
      throw error;
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
      throw e;
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
}
