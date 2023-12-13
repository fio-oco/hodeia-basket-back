import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService){}

    @Get('all')
    async findAll(): Promise<Match[]>{
        return await this.matchService.findAllMatches();
    }
    //need to test these tomorrow to make sure that they work, need matches in db first. 
    @Get('date/:fecha')
    async find(@Param('fecha') fecha: Date): Promise<Match[] | null>{
        return await this.matchService.findMatchesByDate(fecha);
    }

    @Patch('setWinner/:partidoId/equipoGanador/:equipoid')
    async setEquipoGanador(
      @Param('partidoId') partidoId: string,
      @Param('equipoid') equipoid: string,
    ): Promise<void> {
      await this.matchService.setWinningTeam(partidoId, equipoid);
    }

}
