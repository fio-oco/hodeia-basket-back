import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  usuarioId: UUID; //is this correct??

  @Column({ type: 'varchar', length: 30 })
  nombre: string;

  @Column({ type: 'varchar', length: 40 })
  apellidos: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar'})
  password: string;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // This is supposed to hash the password before saving it
  }

/*   @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   
  gender: string;
  //qué queremos poner aquí como opciones? */
}