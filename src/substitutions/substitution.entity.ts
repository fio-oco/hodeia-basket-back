import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';


@Entity({name: 'cambios'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Substitution {
  @PrimaryGeneratedColumn('uuid')
  cambioid: uuid;
 
  @ManyToOne(() => Player, player => player.jugador_entra_substitutions)
  @JoinColumn({name: 'jugador_entra'})
  @Column({ type: 'uuid'})
  jugador_entra: Player;

  @ManyToOne(() => Player, player => player.jugador_sale_substitutions)
  @JoinColumn({name: 'jugador_sale'})
  @Column({ type: 'uuid'})
  jugador_sale: Player;

 @ManyToOne(() => Match, match => match.match_substitutions)
 @JoinColumn({name: 'partido_id'})
  @Column({type: 'uuid'})
  partido_id: Match;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  marcatiempocambio: Date;

}