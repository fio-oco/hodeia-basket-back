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

    @Get('id/:partidoid')
    async findOne(@Param('partidoid') partidoid: string): Promise<Match>{
      return await this.matchService.getMatchById(partidoid);
    }

    /* @Get('equipo/: equipoid')
    async findMatchTeams() */
    
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

    @Get('teamsplayersdate/:partidoid')
    async getMatchTeamsAndPlayers(
      @Param('partidoid') partidoid: string){
        try {
          const matchDetails = await this.matchService.getMatchTeamsAndPlayers(partidoid);
          return matchDetails;
        } catch (error){
          throw error;
        }
      }
    
    @Get('byLD/:ligaid/:fecha')
    async getMatchesByLeagueAndDate(
      @Param('ligaid') ligaid: string,
      @Param('fecha') fecha: string,
    ) {
      const matches = await this.matchService.getMatchesByLeagueAndDate(ligaid, fecha);
      return matches;
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

    // This needs a lot of thinking
    @Patch('results/:partidoid')
    async manageMatchResults(@Param('partidoid') partidoid: string){
      try {
        const result = await this.matchService.manageMatchResults(partidoid);
        return {success: true, message: 'Match results managed successfully', result};
      } catch (error){
        return {success: false, message: 'Failed to manage match results', error: error.message};
      }
    }

}
