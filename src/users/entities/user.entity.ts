import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Role } from './role.entity';
import { Team } from 'src/teams/team.entity';
import { Match } from 'src/matches/match.entity';

@Entity({name: 'usuarios'})
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  usuarioid: uuid; //^^ handles automatic generation of UUIDs for usuarioID

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar',  length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({type: 'varchar'})
  genero: string;

  @ManyToOne(() => Role, role => role.users) 
  @Column({ type: 'uuid', nullable: false, default: 'e144cde5-91df-4f7e-b808-c984ba493507'})
  @JoinColumn({ name: 'rol'}) //{ name: 'rol' } specifies that the rolData property in the User entity is the column in the User table that should be used to join with the Role entity.
  rol: Role; //relationship in the User entity. It is of type Role, indicating that it holds an instance of the Role entity associated with a specific user.

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar', nullable: true })
  usuarioImg: string;

  @Column({type: 'boolean', default: true})
  isActive: boolean;

  @OneToOne(() => Team, team => team.entrenadorid)
  team: Team;

  @OneToMany(() => Match, match  => match.arbitroid)
  matches_referreed: Match[];

  
}

/*   @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   
  gender: string;
  //qué queremos poner aquí como opciones? */