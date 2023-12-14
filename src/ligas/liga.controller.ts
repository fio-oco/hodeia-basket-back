import { Controller, Get, Param } from '@nestjs/common';
import { LigaService } from './liga.service';
import { Liga } from './liga.entity';

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

}
