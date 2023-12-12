import { Team } from 'src/teams/team.entity';
import { Foul } from 'src/fouls/foul.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Score } from 'src/scores/score.entity';


@Entity({name: 'jugadores'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Player {
  @PrimaryGeneratedColumn('uuid')
  jugadorid: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({type: 'integer'})
  dorsal: number;

// trigger --> faltas_partido
  @Column({type: 'integer'})
  faltas: number;

//trigger --> puntos partido
  @Column({type: 'integer'})
  puntuacion: number;

  @ManyToOne(() => Team, team => team.equipoid)
  @Column({type: 'uuid'})
  @JoinColumn({name:'equipoid'})
  equipoid: Team;

  @Column({type: 'varchar'})
  genero: string;

  @OneToMany(() => Score, score => score.puntoid)
  player_scores: Score[];

  @OneToMany(() => Foul, foul => foul.faltaid)
  player_fouls: Foul[];

  //need to think about calculations of player points score in total and player points, we would need another intermediate table for jugadores_temporada if we want to display player data.

}