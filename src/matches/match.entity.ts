import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from 'src/teams/team.entity';

@Entity({name: 'partidos'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Match {
  @PrimaryGeneratedColumn('uuid')
  partidoid: uuid;

  @Column({type: 'date'})
  fecha: Date; //not sure why this keeps changing to upper case, have a feeling the date will cause me problems.

  //one match will have one visiting team and one local team, a team will have multiple matches
  @ManyToOne(() => Team, team => team.matches)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'visitanteid'})
  visitanteid: Team;

  @ManyToOne(() => Team, team => team.matches)
  @Column({type: 'uuid'})
  @JoinColumn({name: 'localid'})
  localid: Team;

 //one match will 
/*  @ManyToOne()
  @Column({type: 'uuid'})
  localid: uuid

  @ManyToOne()
  @Column({type: 'uuid'})
  equipo_ganador: 
 */


/*   @OneToMany(() => Team, team => team.liga)
  teams: Team[];
 
  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
  @Column({type: 'varchar'})
  genero: string; */
} 