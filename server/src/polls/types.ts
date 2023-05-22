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
