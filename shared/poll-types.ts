export interface Participants {
  [participantId: string]: string;
}

export interface Poll {
  id: string;
  topic: string;
  votesPerUser: number;
  participants: Participants;
  adminId: string;
}
