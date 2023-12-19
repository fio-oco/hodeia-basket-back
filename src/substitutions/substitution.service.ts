import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Substitution } from './substitution.entity';
import { CreateSubstitutionDTO } from './create-substitution.dto';
import { Player } from 'src/players/player.entity';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class SubstitutionService {
  constructor(
    @InjectRepository(Substitution)
    private readonly substitutionRepository: Repository<Substitution>,
    private readonly socketGateway: SocketGateway,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findSubstitutionsByMatch(
    partido_id: string,
  ): Promise<Substitution[] | null> {
    return await this.substitutionRepository.find({ where: { partido_id: Equal(partido_id)  } });
  }

  async createSubstitution(createSubstitutionDTO: CreateSubstitutionDTO): Promise<Substitution>{
    const newSubstitution = this.substitutionRepository.create({
      ...createSubstitutionDTO,
      marcatiempocambio: new Date(),
    });
    try{
      const savedSub = await this.substitutionRepository.save(newSubstitution);
      //this.socketGateway.emitSubstitutionUpdate(createSubstitutionDTO.partido_id, savedSub);
      return savedSub;
    } catch (error){
      throw error;
    }
  }

}
