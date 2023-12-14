import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from 'src/teams/team.entity';
import { User } from 'src/users/entities/user.entity';
import { Season } from 'src/seasons/season.entity';
import { Score } from 'src/scores/score.entity';

@Entity({name: 'partidos'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Match {
  @PrimaryGeneratedColumn('uuid')
  partidoid: uuid;

  @Column({type: 'date'})
  fecha: Date; //not sure why this keeps changing to upper case, have a feeling the date will cause me problems.

  //one match will have one visiting team and one local team, a team will have multiple matches
  @ManyToOne(() => Team, team => team.matches_away)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'visitanteid'})
  visitanteid: Team;

  @ManyToOne(() => Team, team => team.matches_home)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'localid'})
  localid: Team;

  //might need a trigger here, need to ask about this relationship again
  //should the array here be called winning team rather than matches won?
  @ManyToOne(() => Team, team => team.matches_won)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'equipo_ganador'})
  equipo_ganador: Team;

  @ManyToOne(() => Team, team => team.matches_lost)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'equipo_perdedor'})
  equipo_perdedor: Team;

 @ManyToOne(() => User, user => user.matches_referreed)
 @Column({type: 'uuid'})
 @JoinColumn({name: 'arbitroid'})
 arbitroid: User;

 @OneToMany(() => Score, score => score.partidoid)
 match_scores: Score[];

 @ManyToOne(() => Season, season => season.matches_of_season)
  @JoinColumn([
    { name: 'fechatemporada', referencedColumnName: 'temporada_num' },
    { name: 'ligaid', referencedColumnName: 'ligaid' }
  ])
  season: Season;

  @Column({ type: 'integer' })
  fechatemporada: number;

  @Column({ type: 'uuid' })
  ligaid: string;

 @Column({type: 'integer'})
 puntuacion_equipo_local: number;

 @Column({type: 'integer'})
 puntuacion_equipo_visitante: number;
} 