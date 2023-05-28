export interface Participants {
  [participantId: string]: string;
}

export type Poll = {
  id: string;
  topic: string;
  votesPerUser: number;
  participants: Participants;
  adminId: string;
  hasStarted: boolean;
};
