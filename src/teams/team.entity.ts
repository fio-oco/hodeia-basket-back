import { Liga } from 'src/ligas/liga.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({name: 'equipos'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Team {
  @PrimaryGeneratedColumn('uuid')
  equipoid: uuid;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
 @OneToOne(() => User, user => user.team)
  @JoinColumn({name: 'usuarioid'})
  @Column({type: 'uuid'})
  entrenadorid: User; //to bring the obj the the user

  // each league has many teams, each team can only have one league (many to one here)
 /*  @ManyToOne(() => Liga, liga => liga.teams)
  @Column({type: 'uuid'})
  @JoinColumn({name:ligaid})
  ligaid: uuid;
 */
  @Column({type: 'varchar'})
  genero: string;

  @Column({type: 'varchar'})
  equipoLogo: string;
} 