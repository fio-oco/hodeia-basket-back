import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ){}
    
    async findAllTeams(): Promise<Team[]> {
        return await this.teamRepository.find();
      }

    async findTeamById(equipoid: string): Promise<Team> {
        return await this.teamRepository.findOne({ where: { equipoid } });
    }

    async findTeamByLeague(liga: string): Promise<Team[]>{
        return await this.teamRepository.find({ where: {liga} });
    }
}
