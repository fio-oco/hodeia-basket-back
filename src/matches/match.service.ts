import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';
import { CreateMatchDTO } from './create-match.dto';
import { Player } from 'src/players/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}
  
  async findAllMatches(): Promise<Match[]> {
    return await this.matchRepository.find();
  }

  async findMatchesByDate(fecha: Date): Promise<Match[] | null> {
    return await this.matchRepository.find({ where: { fecha } });
  }

  async getMatchById(partidoid: string): Promise<Match> {
    return await this.matchRepository.findOne({ where: { partidoid } });
  }

  async getMatchesByLeagueAndDate(
    ligaid: string,
    fecha: string,
  ): Promise<Match[]> {
    const matches = await this.matchRepository
      .createQueryBuilder('match')
      .where('match.ligaid = :ligaid', { ligaid })
      .andWhere('match.fecha = :fecha', { fecha })
      .getMany();

    return matches;
  }

  async getMatchesBySeason(
    ligaid: string,
    fechatemporada: number,
  ): Promise<Match[] | null> {
    try {
      const matches = await this.matchRepository
        .createQueryBuilder('match') //
        .innerJoinAndSelect('match.season', 'season')
        .where('season.ligaid = :ligaid', { ligaid })
        .andWhere('season.temporada_num = :fechatemporada', { fechatemporada })
        .getMany();

      return matches;
    } catch (error) {
      throw error;
    }
  }

//this returned the info in one object but with an array of all players from both teams
async getMatchTeamsAndPlayers(partidoid: string) {
    const query = `
      SELECT 
        m.partidoid AS matchId,
        m.fecha AS matchDate,
        lt.nombre AS localTeamName,
        vt.nombre AS visitorTeamName,
        array_agg(j.nombre || ' ' || j.apellido) AS players
      FROM
        partidos m
      JOIN
        equipos lt ON m.localid = lt.equipoid
      JOIN
        equipos vt ON m.visitanteid = vt.equipoid
      JOIN
        jugadores j ON j.equipoid = lt.equipoid OR j.equipoid = vt.equipoid
      WHERE
        m.partidoid = $1
      GROUP BY
        m.partidoid, m.fecha, lt.nombre, vt.nombre
    `;
  
    const results = await this.matchRepository.query(query, [partidoid]);
    return results;
  }


  async createMatch(createMatchDTO: CreateMatchDTO): Promise<Match> {
    const newMatch = new Match();
    newMatch.fecha = createMatchDTO.fecha;
    newMatch.visitanteid = createMatchDTO.visitanteid;
    newMatch.localid = createMatchDTO.localid;
    newMatch.arbitroid = createMatchDTO.arbitroid;
    newMatch.fechatemporada = createMatchDTO.fechatemporada;
    newMatch.ligaid = createMatchDTO.ligaid;

    try {
      return await this.matchRepository.save(newMatch);
    } catch (error) {
      throw error;
    }
  }

  async setWinningTeam(partidoid: string, equipoid: string): Promise<void> {
    const winningTeam = await this.teamRepository.findOne({
      where: { equipoid },
    });

    if (winningTeam) {
      await this.matchRepository.update(partidoid, {
        equipo_ganador: winningTeam,
      });
    } else {
      throw new Error('Team not found, please verify team id.');
    }
  }

  //I want to come back to this function to simultaneously set winner and loser, need to think about how the calculations will work, maybe if puntos_local > puntos_visitante : equipo_local = equipo_ganador ??
}
