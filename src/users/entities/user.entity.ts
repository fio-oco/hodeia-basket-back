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

  @ManyToOne(() => Role, role => role.users) //
  @JoinColumn({ name: 'rol'}) //{ name: 'rol' } specifies that the rolData property in the User entity is the column in the User table that should be used to join with the Role entity.
  rol: Role; //relationship in the User entity. It is of type Role, indicating that it holds an instance of the Role entity associated with a specific user.

  // @Column({name: 'rolid', type: 'uuid', nullable: false, default: 'e144cde5-91df-4f7e-b808-c984ba493507'}) 
  // rol: uuid; //this has to match the column in the usuarios table
// to remember: don't have problems setting a particular rol when I create a user, but when I try the patch to update rol I get an error stating that rol doesn't exist on user.. even though it is here, will figure it out tomorrow.

  @Column({ type: 'varchar'})
  password: string;

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