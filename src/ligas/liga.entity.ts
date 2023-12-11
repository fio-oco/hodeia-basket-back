import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from 'src/teams/team.entity';

@Entity({name: 'ligas'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Liga {
  @PrimaryGeneratedColumn('uuid')
  ligaid: uuid;

/*   @OneToMany(() => Team, team => team.ligaid)
  teams: Team[];
  */
  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
  @Column({type: 'varchar'})
  genero: string;
} 