import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDTO } from './create_score.dto';
//import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    //private readonly socketGateway: SocketGateway,
  ) {}

  async findScoresByMatch(partidoid: string): Promise<Score[] | null> {
    return await this.scoreRepository.find({ where: { partidoid } });
  }

  async findScoresByPlayer(jugadorid: string): Promise<Score[] | null> {
    return await this.scoreRepository.find({ where: { jugadorid } });
  }

  async createScore(createScoreDTO: CreateScoreDTO): Promise<Score> {
    const newScore = this.scoreRepository.create({
      ...createScoreDTO,
      marcatiempo: new Date(),
    });
    try {
      const savedScore = await this.scoreRepository.save(newScore);
      //this.socketGateway.emitScoreUpdate(createScoreDTO.partidoid, savedScore);
      return savedScore;
    } catch (error) {
      throw error;
    }
  }
}
