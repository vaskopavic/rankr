import { Injectable, Logger } from '@nestjs/common';

import { PollsRepository } from './polls.repository';
import { createPollId, createUserId } from 'src/utils/ids';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(fields: CreatePollFields) {
    const pollId = createPollId();
    const userId = createUserId();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userId,
      pollId,
    });

    // TODO: Create an accessToken based on the userId/pollId

    return {
      poll: createdPoll,
      // accessToken
    };
  }

  async joinPoll(fields: JoinPollFields) {
    const userId = createUserId();

    this.logger.debug(
      `Fetching pollId: ${fields.pollId} for userId: ${userId}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(fields.pollId);

    // TODO: Create an accessToken based on the userId/pollId

    return {
      poll: joinedPoll,
      // accessToken
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    this.logger.debug(
      `Rejoining pollId: ${fields.pollId} for userId: ${fields.userId} with username: ${fields.username}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(fields);

    return joinedPoll;
  }
}
