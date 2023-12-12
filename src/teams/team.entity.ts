import { Liga } from 'src/ligas/liga.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Match } from 'src/matches/match.entity';
import { Season } from 'src/seasons/season.entity';
import { Player } from 'src/players/player.entity';
import { Season_Team } from 'src/season_teams/season_team.entity';

@Entity({name: 'equipos'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Team {
  @PrimaryGeneratedColumn('uuid')
  equipoid: uuid;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
  // ref to usuario id when usuario has the rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b" (entrenador)
  // one team will have one coach (one-one)
 @OneToOne(() => User/* , user => user.team */)
  @JoinColumn({name: 'entrenadorid'})
  @Column({type: 'uuid'})
  entrenadorid: User; //to bring the obj the the user

  // each league has many teams, each team can only have one league (many to one here)
  @ManyToOne(() => Liga, liga => liga.teams)
  @JoinColumn({name: 'liga'})
  @Column({type: 'uuid'})
  liga: uuid;

  @Column({type: 'varchar'})
  genero: string;

  @Column({type: 'varchar'})
  equipoLogo: string;

  @Column({type: 'varchar'})
  ciudad: string;

  @OneToMany(()=> Match, match => match.visitanteid)
  matches_away: Match[];

  @OneToMany(()=> Match, match => match.localid)
  matches_home: Match[]; 

  @OneToMany(()=> Match, match => match.equipo_ganador)
  matches_won: Match[];

  @OneToMany(() => Season_Team, season_team => season_team.equipo_id)
  seasonal_teams: Season_Team[];
 
/*   @OneToMany(() => Player, player => player.equipoid)
  team_players: Player[]; */
/*   usuarioID 1-N arbitroID
temporada 1-N partidos *  */
} 