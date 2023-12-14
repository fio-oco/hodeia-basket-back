import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';
import { CreateMatchDTO } from './create-match.dto';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ){}
        //getting a 404 error with this one, need to fix this amárach
        async findAllMatches(): Promise<Match[]>{
            return await this.matchRepository.find();
        }

        async findMatchesByDate(fecha: Date): Promise<Match[] | null>{
            return await this.matchRepository.find({where: {fecha}});
        }

        async getMatchesBySeason(ligaid: string, fechatemporada: number): Promise<Match[] | null> {
            try {
              const matches = await this.matchRepository
                .createQueryBuilder('match') // Use your Partido entity name
                .innerJoinAndSelect('match.season', 'season') // Join with the season entity
                .where('season.ligaid = :ligaid', { ligaid }) // Filter by ligaid
                .andWhere('season.temporada_num = :fechatemporada', { fechatemporada }) 
                .getMany();
        
              return matches;
            } catch (error) {
              throw error;
            }
          }

          async createMatch(createMatchDTO: CreateMatchDTO): Promise<Match> {
            
            const newMatch = new Match();
            newMatch.fecha = createMatchDTO.fecha;
            newMatch.visitanteid = createMatchDTO.visitanteid;
            newMatch.localid = createMatchDTO.localid;
            newMatch.arbitroid = createMatchDTO.arbitroid;
            newMatch.fechatemporada = createMatchDTO.fechatemporada;
            newMatch.ligaid = createMatchDTO.ligaid;
            
            try{
                return await this.matchRepository.save(newMatch); 
            } catch (error){
                throw error;
            }
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
