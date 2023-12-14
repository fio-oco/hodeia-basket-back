import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, Timestamp, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Player } from 'src/players/player.entity';

@Entity({name: 'faltas_partido'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Foul {
  @PrimaryGeneratedColumn('uuid')
  faltaid: string;

  @ManyToOne(() => Player, player => player.player_fouls)
  @JoinColumn({name: 'jugadorid'})
  @Column({ type: 'uuid'})
  jugadorid: uuid;

  //relation here
  @Column({type: 'uuid'})
  partidoid: uuid;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  marcatiempo: Date;

}