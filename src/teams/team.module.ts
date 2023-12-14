import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Match } from 'src/matches/match.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Liga } from 'src/ligas/liga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Match, User, Liga])],
  controllers: [TeamController],
  providers: [TeamService,]
})
export class TeamModule {}
