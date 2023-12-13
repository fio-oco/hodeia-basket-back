import { Controller, Get, Param } from '@nestjs/common';
import { SeasonTeamService } from './season_team.service';
import { Season_Team } from './season_team.entity';

@Controller('season-teams')
export class SeasonTeamController {
    constructor(private readonly seasonTeamService: SeasonTeamService){}

    @Get('all')
    findAll(){
        return this.seasonTeamService.findAllSeasonTeams();
    }
}
