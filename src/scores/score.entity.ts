import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';


@Entity({name: 'puntos_partido'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Score {
  @PrimaryGeneratedColumn('uuid')
  puntoid: uuid;
 
  @ManyToOne(() => Player, player => player.player_scores)
  @JoinColumn({name: 'jugadorid'})
  @Column({ type: 'uuid'})
  jugadorid: uuid;

 @ManyToOne(() => Match, match => match.match_scores)
 @JoinColumn({name: 'partidoid'})
  @Column({type: 'uuid'})
  partidoid: uuid;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  marcatiempo: Date;

  @Column({type: 'integer'})
  puntos: number;

} 