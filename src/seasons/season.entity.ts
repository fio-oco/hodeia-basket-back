import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Liga } from 'src/ligas/liga.entity';
import { Match } from 'src/matches/match.entity';

@Entity({name: 'temporadas'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Season {

  @PrimaryColumn({ type: 'varchar'})
  ligaid: string;

  @PrimaryColumn({type: 'integer'})
  fecha_num: number;

  //many seasons can correspond to a single league, one league will have many seasons
  @ManyToOne(() => Liga, liga => liga.seasons)
  @JoinColumn({ name: 'ligaid' })
  liga: Liga;

  //Don't know how to ref the primary key of temporada because its ligaid and fecha_num, need to look it up 
 /*  @OneToMany(() => Match, match => match.season_pkey??)
  seasonMatches: Match[]; */
}