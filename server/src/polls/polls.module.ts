import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { jwtModule, redisModule } from 'src/modules.config';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollsRepository } from './polls.repository';

@Module({
  imports: [ConfigModule, redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository],
})
export class PollsModule {}
