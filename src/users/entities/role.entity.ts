import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  rolId: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ManyToMany(() => User, user => user.rol)
  users: User[];
}