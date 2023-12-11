import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({name: 'roles'}) // getting errors here (I think I need it but it breaks the database connection when I added it but this way blank before)
export class Role {
  @PrimaryGeneratedColumn('uuid')
  jugadorid: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

/*   @Column({type: 'integer'})
  dorsal: integer;
 */

}