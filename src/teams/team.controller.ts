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
async findOne(@Param('equipoid') equipoid: string): Promise<Team> {
  return await this.teamService.findTeamById(equipoid);
}

@Get('liga/:liga')
async find(@Param('liga') liga: string): Promise<Team[] | null> {
  return await this.teamService.findTeamByLeague(liga);
}

//should be in equipobyid
/* @Get(':ligaId/:numTemporada')
  async findBySeason(
    @Param('ligaId') ligaId: string,
    @Param('numTemporada') numTemporada: number,
  ): Promise<Team[]> {
    return await this.teamService.findTeamsBySeason(ligaId, numTemporada);
  } */
}


