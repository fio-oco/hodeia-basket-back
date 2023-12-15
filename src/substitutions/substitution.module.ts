import { Module } from '@nestjs/common';
import { SubstitutionController } from './substitution.controller';
import { SubstitutionService } from './substitution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Substitution } from './substitution.entity';
import { Player } from 'src/players/player.entity';
import { Match } from 'src/matches/match.entity';
import { Team } from 'src/teams/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Substitution, Player, Match, Team])],
  controllers: [SubstitutionController],
  providers: [SubstitutionService]
})
export class SubstitutionModule {


}


