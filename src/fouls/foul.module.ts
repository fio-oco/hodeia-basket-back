import { Module } from '@nestjs/common';
import { FoulController } from './foul.controller';
import { FoulService } from './foul.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foul } from './foul.entity';
import { Player } from 'src/players/player.entity';
import { Match } from 'src/matches/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foul, Player, Match])],
  controllers: [FoulController],
  providers: [FoulService]
})
export class FoulModule {}