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
import { FoulService } from 'src/fouls/foul.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Player, Match, Team, Season])],
  controllers: [ScoreController],
  providers: [ScoreService, MatchService],
  exports: [ScoreService],
})
export class ScoreModule {}
