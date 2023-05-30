import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

import { Poll } from 'shared/poll-types';
import { PollsRepository } from './polls.repository';
import { createPollId, createUserId, createNominationId } from 'src/utils/ids';
import {
  AddNominationFields,
  AddParticipantFields,
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
  SubmitRankingsFields,
} from './types';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createPoll(fields: CreatePollFields) {
    const pollId = createPollId();
    const userId = createUserId();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userId,
      pollId,
    });

    this.logger.debug(
      `Creating token string for pollId: ${createdPoll.id} and userId: ${userId}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollId: createdPoll.id,
        username: fields.username,
      },
      {
        subject: userId,
      },
    );

    return {
      poll: createdPoll,
      accessToken: signedString,
    };
  }

  async joinPoll(fields: JoinPollFields) {
    const userId = createUserId();

    this.logger.debug(
      `Fetching pollId: ${fields.pollId} for userId: ${userId}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(fields.pollId);

    this.logger.debug(
      `Creating token string for pollId: ${joinedPoll.id} and userId: ${userId}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollId: joinedPoll.id,
        username: fields.username,
      },
      {
        subject: userId,
      },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    this.logger.debug(
      `Rejoining pollId: ${fields.pollId} for userId: ${fields.userId} with username: ${fields.username}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(fields);

    return joinedPoll;
  }

  async addParticipant(addParticipant: AddParticipantFields): Promise<Poll> {
    return this.pollsRepository.addParticipant(addParticipant);
  }

  async removeParticipant(
    pollId: string,
    userId: string,
  ): Promise<Poll | void> {
    const poll = await this.pollsRepository.getPoll(pollId);

    if (!poll.hasStarted) {
      const updatedPoll = await this.pollsRepository.removeParticipant(
        pollId,
        userId,
      );
      return updatedPoll;
    }
  }

  async getPoll(pollId: string): Promise<Poll> {
    return this.pollsRepository.getPoll(pollId);
  }

  async addNomination({
    pollId,
    userId,
    text,
  }: AddNominationFields): Promise<Poll> {
    return this.pollsRepository.addNomination({
      pollId,
      nominationId: createNominationId(),
      nomination: {
        userId,
        text,
      },
    });
  }

  async removeNomination(pollId: string, nominationId: string): Promise<Poll> {
    return this.pollsRepository.removeNomination(pollId, nominationId);
  }

  async startPoll(pollId: string): Promise<Poll> {
    return this.pollsRepository.startPoll(pollId);
  }

  async submitRankings(rankingsData: SubmitRankingsFields): Promise<Poll> {
    const hasPollStarted = this.pollsRepository.getPoll(rankingsData.pollId);

    if (!hasPollStarted) {
      throw new BadRequestException(
        'Participants cannot rank until the poll has started.',
      );
    }

    return this.pollsRepository.addParticipantRankings(rankingsData);
  }
}
