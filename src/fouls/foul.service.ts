import { Injectable } from '@nestjs/common';
import { Foul } from './foul.entity';
import { Repository } from 'typeorm';
import { CreateFoulDTO } from './create_fouls.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class FoulService {
    constructor(
        @InjectRepository(Foul)
        private readonly foulRepository: Repository<Foul>,
        private readonly socketGateway: SocketGateway
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
          const savedFoul = await this.foulRepository.save(newFoul)
          this.socketGateway.emitFoulUpdate(createFoulDTO.partidoid, savedFoul)
          return savedFoul;
        } catch (error) {
          throw error;
        }
      }
}
