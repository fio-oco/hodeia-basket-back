import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from './liga.entity';
import { Repository } from 'typeorm';
import { CreateLigaDTO } from './create-liga.dto';

@Injectable()
export class LigaService {
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
    ){}

    async findAllLeagues(): Promise<Liga[]>{
        return await this.ligaRepository.find();
    }

    async findLeagueById(ligaid: string): Promise<Liga>{
        return await this.ligaRepository.findOne({ where: {ligaid} });
    }

    async createLeague(createLigaDTO: CreateLigaDTO): Promise<any>{
        const newLeague = new Liga();
        newLeague.nombre = createLigaDTO.nombre;
        newLeague.genero = createLigaDTO.genero;

        try {
            return await this.ligaRepository.save(newLeague);
        } catch (error){
           throw error;
        }
    }
} 

