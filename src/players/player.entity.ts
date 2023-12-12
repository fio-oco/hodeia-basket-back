import { Team } from 'src/teams/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


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
  //need to declare connection between faltas, puntuación and equipo id here. 

  @Column({type: 'varchar'})
  genero: string;

}