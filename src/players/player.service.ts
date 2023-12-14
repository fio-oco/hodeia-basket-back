import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ){}

    async findPlayersByTeam(equipoid: string): Promise<Player[]>{
        return await this.playerRepository.find({ where: { equipoid: Equal(equipoid) }});
    }
}
