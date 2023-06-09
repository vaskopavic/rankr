import { Length, IsInt, IsString, Min, Max } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @Length(1, 100)
  topic: string;

  @IsInt()
  @Min(1)
  @Max(5)
  votesPerUser: number;

  @IsString()
  @Length(1, 25)
  username: string;
}

export class JoinPollDto {
  @IsString()
  @Length(6, 6)
  pollId: string;

  @IsString()
  @Length(1, 25)
  username: string;
}

export class NominationDto {
  @IsString()
  @Length(1, 100)
  text: string;
}
