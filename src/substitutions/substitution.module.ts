import { Module } from '@nestjs/common';
import { SubstitutionController } from './substitution.controller';
import { SubstitutionService } from './substitution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Substitution } from './substitution.entity';
import { Player } from 'src/players/player.entity';
import { Match } from 'src/matches/match.entity';
import { Team } from 'src/teams/team.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MatchService } from 'src/matches/match.service';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Substitution, Player, Match, Team, Season])],
  controllers: [SubstitutionController],
  providers: [SubstitutionService, SocketGateway, MatchService]
})
export class SubstitutionModule {


}


