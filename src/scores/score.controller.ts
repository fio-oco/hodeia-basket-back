import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.entity';
import { CreateScoreDTO } from './create_score.dto';

@Controller('scores')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService){}

    @Get('byMatch/:partidoid')
    async find(@Param('partidoid') partidoid: string): Promise<Score[] | null>{
        return await this.scoreService.findScoresByMatch(partidoid);
    }

    @Get('byPlayer/:jugadorid')
    async findBy(@Param('jugadorid') jugadorid: string): Promise<Score[] | null>{
      return await this.scoreService.findScoresByPlayer(jugadorid)
    }

    @Post('new')
    async createScore(@Body(new ValidationPipe()) createScoreDTO: CreateScoreDTO) {
      try {
        const createdScore = await this.scoreService.createScore(createScoreDTO);
        return createdScore;
      } catch (error) {
        throw error;
      }
    }
   /*  @Post('score')
    async createScore(@Body() Promise<any>){
        try{
            const createdScore = await this.scoreService.createScore(createScoreDto)
            return createdScore;
        } catch (error){
            throw error;
        }
    } */
}
