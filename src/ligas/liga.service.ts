import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from './liga.entity';
import { Repository } from 'typeorm';

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
} 

