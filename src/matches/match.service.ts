import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/team.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ){}
        //getting a 404 error with this one, need to fix this amárach
        async findAllMatches(): Promise<Match[]>{
            return await this.matchRepository.find();
        }

        async findMatchesByDate(fecha: Date): Promise<Match[] | null>{
            return await this.matchRepository.find({where: {fecha}});
        }

        async setWinningTeam(partidoid: string, equipoid: string): Promise<void>{
        const winningTeam = await this.teamRepository.findOne({where: {equipoid}});

        if (winningTeam){
            await this.matchRepository.update(partidoid, {equipo_ganador: winningTeam});
        } else {
            throw new Error ('Team not found, please verify team id.')
        } 
    }

    //I want to come back to this function to simultaneously set winner and loser, need to think about how the calculations will work, maybe if puntos_local > puntos_visitante : equipo_local = equipo_ganador ??
}
