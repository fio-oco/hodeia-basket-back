import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Equal, Repository } from 'typeorm';
import { CreatePlayerDTO } from './create-player.dto';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ){}

    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<any>{
        const newPlayer = new Player();
        newPlayer.nombre = createPlayerDTO.nombre;
        newPlayer.apellido  = createPlayerDTO.apellido;
        newPlayer.dorsal  = createPlayerDTO.dorsal;
        newPlayer.equipoid  = createPlayerDTO.equipoid;
        /* newPlayer.puntuacion  = createPlayerDTO.puntuacion;
        newPlayer.faltas  = createPlayerDTO.faltas; */
        newPlayer.genero  = createPlayerDTO.genero;
    
        try{
            return await this.playerRepository.save(newPlayer);
        } catch (error) {
            throw error;
        }
    }

    async findPlayersByTeam(equipoid: string): Promise<Player[]>{
        return await this.playerRepository.find({ where: { equipoid: Equal(equipoid) }});
    }
}
