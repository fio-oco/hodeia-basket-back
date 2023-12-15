import { Injectable } from '@nestjs/common';
import { Foul } from './foul.entity';
import { Repository } from 'typeorm';
import { CreateFoulDTO } from './create_fouls.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoulService {
    constructor(
        @InjectRepository(Foul)
        private readonly foulRepository: Repository<Foul>
    ){}

    async findFoulsByMatch(partidoid:string ): Promise<Foul[] | null>{
        return await this.foulRepository.find({where: {partidoid}})
    }

    async findFoulsByPlayer(jugadorid: string): Promise<Foul[] | null>{
        return await this.foulRepository.find({where: {jugadorid}})
      }

    async createFoul(createFoulDTO: CreateFoulDTO): Promise<Foul> {
        const newFoul = this.foulRepository.create({
          ...createFoulDTO,
          marcatiempo: new Date(), 
        });
        try {
          return await this.foulRepository.save(newFoul);
        } catch (error) {
          throw error;
        }
      }
}
