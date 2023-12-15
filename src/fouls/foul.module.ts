import { Module } from '@nestjs/common';
import { FoulController } from './foul.controller';
import { FoulService } from './foul.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foul } from './foul.entity';
import { Player } from 'src/players/player.entity';
import { Match } from 'src/matches/match.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MatchService } from 'src/matches/match.service';
import { Team } from 'src/teams/team.entity';
import { TeamService } from 'src/teams/team.service';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foul, Player, Match, Team, Season])],
  controllers: [FoulController],
  providers: [FoulService, SocketGateway, MatchService, TeamService]
})
export class FoulModule {}