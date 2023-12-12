import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ){}
    
    async findAllTeams(): Promise<Team[]> {
        return await this.teamRepository.find();
      }

    async viewTeam(equipoid: string): Promise<Team> {
        return await this.teamRepository.findOne({ where: { equipoid } });
    }
}
