import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDTO } from './create_score.dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>
    ){}

    async findScoresByMatch(partidoid:string ): Promise<Score[] | null>{
        return await this.scoreRepository.find({where: {partidoid}})
    }

    async findScoresByPlayer(jugadorid: string): Promise<Score[] | null>{
      return await this.scoreRepository.find({where: {jugadorid}})
    }

    async createScore(createScoreDTO: CreateScoreDTO): Promise<Score> {
        const newScore = this.scoreRepository.create({
          ...createScoreDTO,
          marcatiempo: new Date(), 
        });
        try {
          return await this.scoreRepository.save(newScore);
        } catch (error) {
          throw error;
        }
      }
}
