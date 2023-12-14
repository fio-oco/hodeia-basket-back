import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { CreateMatchDTO } from './create-match.dto';

@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService){}

    @Get('all')
    async findAll(): Promise<Match[]>{
        return await this.matchService.findAllMatches();
    } 

    /* @Get('equipo/: equipoid')
    async findMatchTeams() */

    //need to test this tomorrow and format date in db. 
    @Get('date/:fecha')
    async find(@Param('fecha') fecha: Date): Promise<Match[] | null>{
        return await this.matchService.findMatchesByDate(fecha);
    }

    @Get('/season/:ligaid/:fechatemporada')
    async getMatchesBySeason(
      @Param('ligaid') ligaid: string,
      @Param('fechatemporada') fechatemporada: number,
    ) {
      try {
        const matches = await this.matchService.getMatchesBySeason(
          ligaid,
          fechatemporada,
        );
        
        return matches;
      } catch (error) {
        throw error;
      }
    }

    @Post()
    async createMatch(@Body(new ValidationPipe()) createMatchDTO: CreateMatchDTO) {
      try {
        const createdMatch = await this.matchService.createMatch(createMatchDTO);
        return createdMatch;
      } catch (error) {
        throw error;
      }
    }

    // Don't know if a need to seperate set winner and set loser at once or if I need seperate functions.
    // This needs a lot of thinking
    @Patch('setWinner/:partidoId/equipoGanador/:equipoid')
    async setEquipoGanador(
      @Param('partidoId') partidoId: string,
      @Param('equipoid') equipoid: string,
    ): Promise<void> {
      await this.matchService.setWinningTeam(partidoId, equipoid);
    }

}
