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
