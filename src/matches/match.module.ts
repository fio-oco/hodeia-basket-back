import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/team.entity';
import { User } from 'src/users/entities/user.entity';
import { Season } from 'src/seasons/season.entity';
import { Substitution } from 'src/substitutions/substitution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, User, Season, Substitution])],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {

}
