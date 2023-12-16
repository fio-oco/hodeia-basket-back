import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { CreatePlayerDTO } from './create-player.dto';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}

    @Get('equipo/:equipoid')
    async find(@Param('equipoid') equipoid: string): Promise<Player[] | null>{
        return await this.playerService.findPlayersByTeam(equipoid);
    }

    @Post('new')
    async createPlayer(@Body(new ValidationPipe()) createPlayerDTO: CreatePlayerDTO){
        try {
            const createdPlayer = await this.playerService.createPlayer(createPlayerDTO);
            return createdPlayer;
        } catch (error){
            throw error;
        }
    }
    //need a patch here to be able to update player equipoid ie. change players on a team..

}

