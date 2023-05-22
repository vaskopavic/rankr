import { Injectable } from '@nestjs/common';

import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';
import { createPollId, createUserId } from 'src/utils/ids';

@Injectable()
export class PollsService {
  async createPoll(fields: CreatePollFields) {
    const pollId = createPollId();
    const userId = createUserId();

    return { ...fields, userId, pollId };
  }

  async joinPoll(fields: JoinPollFields) {
    const userId = createUserId();

    return { ...fields, userId };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    return fields;
  }
}
