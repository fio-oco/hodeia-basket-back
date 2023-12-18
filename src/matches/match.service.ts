import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';
import { CreateMatchDTO } from './create-match.dto';
import { Player } from 'src/players/player.entity';
import { Season_Team } from 'src/season_teams/season_team.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Season)
    private readonly seasonTeamRepository: Repository<Season_Team>,
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
  //not sure if this is what Jon needs but I think it gets all the data from relevant tables.
  async getLocalTeamAndPlayers(partidoid: string) {
    try {
      const localTeamDetails = await this.matchRepository
        .createQueryBuilder('partidos')
        .leftJoinAndSelect('partidos.localid', 'localTeam')
        .leftJoinAndMapMany(
          'localTeam.players',
          Player, // Entity
          'jugadores', // Alias for joining tables
          'jugadores.equipoid = localTeam.equipoid'
        )
        .where('partidos.partidoid = :partidoid', { partidoid })
        .getOne();
  
      return localTeamDetails;
    } catch (error) {
      throw error;
    }
  }
  
  async getVisitorTeamAndPlayers(partidoid: string) {
    try {
      const visitorTeamDetails = await this.matchRepository
        .createQueryBuilder('partidos')
        .leftJoinAndSelect('partidos.visitanteid', 'visitanteTeam')
        .leftJoinAndMapMany(
          'visitanteTeam.players',
          Player, // Entity
          'jugadores', // Alias for joining tables
          'jugadores.equipoid = visitanteTeam.equipoid'
        )
        .where('partidos.partidoid = :partidoid', { partidoid })
        .getOne();
  
      return visitorTeamDetails;
    } catch (error) {
      throw error;
    }
  }
  
/*   async getMatchTeamsAndPlayers(partidoid: string) {
    try {
      const matchDetails = await this.matchRepository
        .createQueryBuilder('partidos')
        .leftJoinAndSelect('partidos.localid', 'localTeam')
        .leftJoinAndSelect('partidos.visitanteid', 'visitanteTeam')
        .leftJoinAndMapMany(
          'localTeam.player',
          Player, //entity 
          'jugadores', // Alias for joining tables
          'jugadores.equipoid = localTeam.equipoid OR jugadores.equipoid = visitanteTeam.equipoid'
        )
        .where('partidos.partidoid = :partidoid', { partidoid })
        .getOne();
  
      return matchDetails;
    } catch (error) {
      throw error;
    }
  } */
  
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

  async manageMatchResults(partidoid: string){
    try {
      const match = await this.matchRepository.findOne({where: { partidoid }});

      if (!match){
        throw new Error('Match not found');
      }

      if (match.puntuacion_equipo_local > match.puntuacion_equipo_visitante){
        match.equipo_ganador = match.localid;
        match.equipo_perdedor = match.visitanteid;
      } else {
        match.equipo_ganador = match.visitanteid;
        match.equipo_perdedor = match.localid;
      }

      await this.matchRepository.save(match);

      await this.updateSeasonTeamTable(match);

      return match;
    } catch (error){
      throw error;
    }
  }

  private async updateSeasonTeamTable(match: Match){
    try {
      await this.seasonTeamRepository
      .createQueryBuilder()
      .update(Season_Team)
      .set({
        partidos_jugados: () => 'partidos_jugados +1',
        partidos_ganados: () => 'CASE WHEN equipo_id = :ganador THEN partidos_ganados + 1 ELSE partidos_ganados END',
        partidos_perdidos: () => 'CASE WHEN equipo_id = :perdedor THEN partidos_perdidos + 1 ELSE partidos_perdidos END',
        puntos_liga: () => 'puntos_liga + CASE WHEN equipo_id = :ganador THEN 3 ELSE 0 END',
        puntuacion_favor: () => ` puntuacion_favor + CASE 
        WHEN equipo_id = :ganador AND :scoreVisitante > :scoreLocal THEN :scoreVisitante
        WHEN equipo_id = :ganador AND :scoreLocal > :scoreVisitante THEN :scoreLocal
        WHEN equipo_id = :perdedor AND :scoreLocal > :scoreVisitante THEN :scoreVisitante
        WHEN equipo_id = :perdedor AND :scoreVisitante > :scoreLocal THEN :scoreLocal
        ELSE puntuacion_favor END`,
        puntuacion_contra: () => `puntuacion_contra + CASE 
        WHEN equipo_id = :ganador AND :scoreVisitante > :scoreLocal THEN :scoreLocal
        WHEN equipo_id = :ganador AND :scoreLocal > :scoreVisitante THEN :scoreVisitante
        WHEN equipo_id = :perdedor AND :scoreLocal > :scoreVisitante THEN :scoreLocal
        WHEN equipo_id = :perdedor AND :scoreVisitante > :scoreLocal THEN :scoreVisitante
        ELSE puntuacion_contra END`,
      })
      .where('equipo_id IN (:ganador, :perdedor)', {
        ganador: match.equipo_ganador,
        perdedor: match.equipo_perdedor,
        scoreVisitante: match.puntuacion_equipo_visitante,
        scoreLocal: match.puntuacion_equipo_local,
      })
      .execute();
    } catch (error){
      throw error;
    }
  }

 
/*   
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
  } */

  //I want to come back to this function to simultaneously set winner and loser, need to think about how the calculations will work, maybe if puntos_local > puntos_visitante : equipo_local = equipo_ganador ??
 // I need to figure out how to update the data from equipos_temporada from here too. 


 /*  this code is aaaalmost working; it affects all columns it should, but it missing the addition ie just resets the value rather than adding to it for p_favor and p_contra
        .set({
        partidos_jugados: () => 'partidos_jugados +1',
        partidos_ganados: () => 'CASE WHEN equipo_id = :ganador THEN partidos_ganados + 1 ELSE partidos_ganados END',
        partidos_perdidos: () => 'CASE WHEN equipo_id = :perdedor THEN partidos_perdidos + 1 ELSE partidos_perdidos END',
        puntos_liga: () => 'puntos_liga + CASE WHEN equipo_id = :ganador THEN 3 ELSE 0 END',
        puntuacion_favor: () => `CASE 
        WHEN equipo_id = :ganador AND :scoreVisitante > :scoreLocal THEN :scoreVisitante
        WHEN equipo_id = :ganador AND :scoreLocal > :scoreVisitante THEN :scoreLocal
        WHEN equipo_id = :perdedor AND :scoreLocal > :scoreVisitante THEN :scoreVisitante
        WHEN equipo_id = :perdedor AND :scoreVisitante > :scoreLocal THEN :scoreLocal
        ELSE puntuacion_favor END`,
        puntuacion_contra: () => `CASE 
        WHEN equipo_id = :ganador AND :scoreVisitante > :scoreLocal THEN :scoreLocal
        WHEN equipo_id = :ganador AND :scoreLocal > :scoreVisitante THEN :scoreVisitante
        WHEN equipo_id = :perdedor AND :scoreLocal > :scoreVisitante THEN :scoreLocal
        WHEN equipo_id = :perdedor AND :scoreVisitante > :scoreLocal THEN :scoreVisitante
        ELSE puntuacion_contra END`,
      })
      .where('equipo_id IN (:ganador, :perdedor)', {
        ganador: match.equipo_ganador,
        perdedor: match.equipo_perdedor,
        scoreVisitante: match.puntuacion_equipo_visitante,
        scoreLocal: match.puntuacion_equipo_local,
      }) */
}
