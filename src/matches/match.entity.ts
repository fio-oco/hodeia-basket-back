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
  @ManyToOne(() => Team, team => team.matches_won)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'equipo_ganador'})
  equipo_ganador: Team;

 @ManyToOne(() => User, user => user.matches_referreed)
 @Column({type: 'uuid'})
 @JoinColumn({name: 'arbitroid'})
 arbitroid: User;

 @OneToMany(() => Score, score => score.partidoid)
 match_scores: Score[];

 //need to figure out what data type fecha_num and ligaid

@ManyToOne(() => Season, season => season.matches_of_season)
 @JoinColumn([
  {name: 'fechatemporada', referencedColumnName: 'temporada_num'},
  {name: 'ligaid', referencedColumnName: 'ligaid'}
])
@Column({type: 'integer'})
 fechatemporada: number;
 
 @Column({type: 'uuid'})
 ligaid: string;

 //I'm getting no errors but I don't think the above is going to work it loses the reference to ligaid in the seasons entity, I don't know what to do with this.

 //this is from chat.gbt, I don't think its going to work, it just doesn't seem to follow the logic from before. I'll work on it later and try see if I can get it to work or maybe declare each column seperately with its own @ManyToOne
/*  @ManyToOne(() => Season, season => season.matches_of_season, {
  primary: true,
})
@JoinColumn([
  { name: 'fechaTemporada', referencedColumnName: 'temporada_num' },
  { name: 'ligaid', referencedColumnName: 'ligaid' },
])
fechaTemporadaAndLigaId: Season;

@Column({ type: 'timestamp' })
fechaTemporada: Date;

@Column({ type: 'uuid' })
ligaid: string; */

/*  
  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
  @Column({type: 'varchar'})
  genero: string; */
} 