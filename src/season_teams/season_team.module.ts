import { Module } from '@nestjs/common';
import { SeasonTeamController } from './season_team.controller';
import { SeasonTeamService } from './season_team.service';
import { Season_Team } from './season_team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';
import { Match } from 'src/matches/match.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Season_Team, Team, Season, Match])],
    controllers: [SeasonTeamController],
    providers: [SeasonTeamService]
})
export class SeasonTeamModule {}
