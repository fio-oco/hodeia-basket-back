import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { LigaService } from './liga.service';
import { Liga } from './liga.entity';
import { CreateLigaDTO } from './create-liga.dto';

@Controller('ligas')
export class LigaController {
    constructor(private readonly ligaService: LigaService){}

    @Get('all')
    findAll(){
        return this.ligaService.findAllLeagues();
    }

    @Get('id/:ligaid')
    async findOne(@Param('ligaid') ligaid: string): Promise<Liga>{
        return await this.ligaService.findLeagueById(ligaid);
    }

    @Post('new')
    async createLeague(@Body(new ValidationPipe()) createLigaDTO: CreateLigaDTO){
        try {
            const createdLeague = await this.ligaService.createLeague(createLigaDTO);
            return createdLeague;
        } catch (error) {
            throw error;
        }
    }

}
