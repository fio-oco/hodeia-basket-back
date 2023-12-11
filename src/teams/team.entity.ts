import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({name: 'equipos'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Team {
  @PrimaryGeneratedColumn('uuid')
  equipoid: uuid;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
  @Column({type: 'uuid'})
  entrendadoruid: uuid;

  // each league has many teams, each team can only have one league (many to one here)
  @Column({type: 'uuid', })
  ligauid: uuid;

  @Column({type: 'varchar'})
  genero: string;

  @Column({type: 'varchar'})
  equipoLogo: string;

 /*  @OneToMany(() => User, user => user.rolData)
  users: User[]; */
} 