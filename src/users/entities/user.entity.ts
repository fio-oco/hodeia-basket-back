import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Role } from './role.entity';

@Entity({name: 'usuarios'})
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  usuarioid: uuid; //^^ handles automatic generation of UUIDs for usuarioID

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar',  length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({name: 'rol', type: 'uuid', nullable: false, default: 'e144cde5-91df-4f7e-b808-c984ba493507'}) 
  rol: string; //this has to match the column in the usuarios table

  @ManyToOne(() => Role, role => role.users) //
  @JoinColumn({ name: 'rol'}) //{ name: 'rol' } specifies that the rolData property in the User entity is the column in the User table that should be used to join with the Role entity.
  rolData: Role; //relationship in the User entity. It is of type Role, indicating that it holds an instance of the Role entity associated with a specific user.


  @Column({ type: 'varchar'})
  password: string;

/*   async hashPassword(password: string): Promise<string>{
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
 */
  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
    // This is supposed to hash the password before saving it
  }

  @Column({ type: 'varchar', nullable: true })
  usuarioImg: string;

  @Column({type: 'boolean', default: true})
  isActive: boolean;
}

/*   @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   
  gender: string;
  //qué queremos poner aquí como opciones? */