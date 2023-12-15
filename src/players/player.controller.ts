import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.entity';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}

    @Get('equipo/:equipoid')
    async find(@Param('equipoid') equipoid: string): Promise<Player[] | null>{
        return await this.playerService.findPlayersByTeam(equipoid);
    }

    //need a patch here to be able to update player equipoid ie. change players on a team..
}
