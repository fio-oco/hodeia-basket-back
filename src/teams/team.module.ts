import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Match } from 'src/matches/match.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Liga } from 'src/ligas/liga.entity';
import { Substitution } from 'src/substitutions/substitution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Match, User, Liga, Substitution])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService]
})
export class TeamModule {}
