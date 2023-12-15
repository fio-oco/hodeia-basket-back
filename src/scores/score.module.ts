import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { Player } from 'src/players/player.entity';
import { Match } from 'src/matches/match.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { MatchService } from 'src/matches/match.service';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Player, Match, Team, Season])],
  controllers: [ScoreController],
  providers: [ScoreService, SocketGateway, MatchService]
})
export class ScoreModule {}
