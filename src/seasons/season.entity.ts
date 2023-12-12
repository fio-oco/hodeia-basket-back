import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Liga } from 'src/ligas/liga.entity';
import { Match } from 'src/matches/match.entity';
import { Season_Team } from 'src/season_teams/season_team.entity';

@Entity({name: 'temporadas'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Season {

  @PrimaryColumn({ type: 'varchar'})
  ligaid: string;

  @PrimaryColumn({type: 'integer'})
  temporada_num: number;

  //many seasons can correspond to a single league, one league will have many seasons
  @ManyToOne(() => Liga, liga => liga.seasons)
  @JoinColumn({ name: 'ligaid' })
  liga: Liga;
  //issue here 

  @OneToMany(() => Season_Team, season_team => season_team.fecha_temporadad)
  teams_of_season: Season_Team[];

  @OneToMany(() => Match, match => match.fechatemporada)
  matches_of_season: Match[];

/*   @OneToMany(() => ) */


  //Don't know how to ref the primary key of temporada because its ligaid and fecha_num, need to look it up 
 /*  @OneToMany(() => Match, match => match.season_pkey??)
  seasonMatches: Match[]; */
}