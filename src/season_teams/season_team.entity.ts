import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';

@Entity({name: 'equipos_temporada'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Season_Team {
  @PrimaryGeneratedColumn('uuid')
  equipo_temporadaid: uuid;
 
  @ManyToOne(() => Team, team => team.seasonal_teams)
  @JoinColumn({name: 'equipo_id'})
  @Column({type: 'uuid'})
  equipo_id: Team;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
  @Column({type: 'integer'})
  partidos_jugados: number;

  @Column({type: 'integer'})
  partidos_ganados: number;

  @Column({type: 'integer'})
  partidos_perdidos: number;

  @Column({type: 'integer'})
  partidos_suspendidos: number;

  @Column({type: 'integer'})
  puntuacion_favor: number;

  @Column({type: 'integer'})
  puntuacion_contra: number;

  @Column({type: 'integer'})
  puntos_liga: number;

//re ligaid in table temporada
  @Column({type: 'uuid'})
  ligaid: uuid;

//re temporada_num in table temporada
  @Column({type: 'integer'})
  fecha_temporadad: number;

@ManyToOne(() => Season, season => season.teams_of_season)
@JoinColumn([
    { name: 'ligaid', referencedColumnName: 'ligaid' },
    { name: 'temporada_num', referencedColumnName: 'temporada_num' },
  ])
  season: Season; // Assuming you have a property 'temporada' of type Temporadas in EquiposTemporada entity
// I have a feeling the above is incorrect, need to come back to it but I think I need to change the values in the join_columns
} 