import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get('all')
    findAll() {
  return this.teamService.findAllTeams();
}

@Get('id/:equipoid')
async findOne(@Param('usuarioid') equipoid: string): Promise<Team> {
  return await this.teamService.viewTeam(equipoid);
}
}


