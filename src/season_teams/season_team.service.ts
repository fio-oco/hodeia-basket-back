import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season_Team } from './season_team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeasonTeamService {
    constructor(
        @InjectRepository(Season_Team)
        private readonly seasonTeamRepository: Repository<Season_Team>,
    ){}
    
    async findAllSeasonTeams(): Promise<Season_Team[]>{
        return await this.seasonTeamRepository.find();
    }
}
