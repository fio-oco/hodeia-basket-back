import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { FoulService } from './foul.service';
import { CreateFoulDTO } from './create_fouls.dto';
import { Foul } from './foul.entity';

@Controller('fouls')
export class FoulController {
    constructor(private readonly foulService: FoulService){}

    @Get('byMatch/:partidoid')
    async find(@Param('partidoid') partidoid: string): Promise<Foul[] | null>{
        return await this.foulService.findFoulsByMatch(partidoid);
    }

    @Get('byPlayer/:jugadorid')
    async findBy(@Param('jugadorid') jugadorid: string): Promise<Foul[] | null>{
      return await this.foulService.findFoulsByPlayer(jugadorid)
    }

    @Post('new')
    async createFoul(@Body(new ValidationPipe()) createFoulDTO: CreateFoulDTO) {
      try {
        const createdFoul = await this.foulService.createFoul(createFoulDTO);
        return createdFoul;
      } catch (error) {
        throw error;
      }
    }

}
