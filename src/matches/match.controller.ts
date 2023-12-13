import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';

@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService){}

    @Get('all')
    async findAll(): Promise<Match[]>{
        return await this.matchService.findAllMatches();
    }
    //need to test this tomorrow and format date in db. 
    @Get('date/:fecha')
    async find(@Param('fecha') fecha: Date): Promise<Match[] | null>{
        return await this.matchService.findMatchesByDate(fecha);
    }

    // Don't know if a need to seperate set winner and set loser at once or if I need seperate functions.
    @Patch('setWinner/:partidoId/equipoGanador/:equipoid')
    async setEquipoGanador(
      @Param('partidoId') partidoId: string,
      @Param('equipoid') equipoid: string,
    ): Promise<void> {
      await this.matchService.setWinningTeam(partidoId, equipoid);
    }

}
