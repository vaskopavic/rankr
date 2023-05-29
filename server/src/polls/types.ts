import { Request } from 'express';
import { Socket } from 'socket.io';

import { Nomination } from 'shared/poll-types';

// service types
export type CreatePollFields = {
  topic: string;
  votesPerUser: number;
  username: string;
};

export type JoinPollFields = {
  pollId: string;
  username: string;
};

export type RejoinPollFields = {
  pollId: string;
  userId: string;
  username: string;
};

export type AddParticipantFields = {
  pollId: string;
  userId: string;
  username: string;
};

export type AddNominationFields = {
  pollId: string;
  userId: string;
  text: string;
};

// repository types
export type CreatePollData = {
  pollId: string;
  topic: string;
  votesPerUser: number;
  userId: string;
};

export type AddParticipantData = {
  pollId: string;
  userId: string;
  username: string;
};

export type AddNominationData = {
  pollId: string;
  nominationId: string;
  nomination: Nomination;
};

// guard types
export type AuthPayload = {
  userId: string;
  pollId: string;
  username: string;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
