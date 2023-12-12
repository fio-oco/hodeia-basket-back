import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from 'src/teams/team.entity';
import { Season } from 'src/seasons/season.entity';

@Entity({name: 'ligas'}) 
export class Liga {
  @PrimaryGeneratedColumn('uuid')
  ligaid: uuid;
 
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({type: 'varchar'})
  genero: string;

  @OneToMany(() => Team, team => team.liga)
  teams: Team[];

  @OneToMany(() => Season, season => season.liga)
  seasons: Season[];
} 