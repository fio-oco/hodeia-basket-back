import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from './entities/role.entity';
import { UpdateUserDto } from './dtos/update-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

/*  // my initial method, started getting errors after trying to fix issues with the rol, but did otherwise work
 async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    user.password = await user.hashPasswordBeforeInsert(); //saltrounds are specified in the user.entity
    return this.userRepository.save(user);
  } */

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.nombre = createUserDto.nombre;
    newUser.apellidos = createUserDto.apellidos;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    
    if (createUserDto.rol) {
      const role = await this.roleRepository.findOne({where: {rolid: createUserDto.rol}}); // to get the Role entity by its ID
      if (role) {
        newUser.rol = role; //to assign Role entity to newUser.rol
      } else {
        throw new Error('Role not found'); // if specified role ID does not exist
      }
    }
    try {
      newUser.password = await newUser.hashPasswordBeforeInsert(); 
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(usuarioid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { usuarioid } });
  }

  async findUsersByRole(roleName: string): Promise<User[] | null>{
    return await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.rol', 'rol')
    .where('rol.nombre = :roleName', {roleName})
    .getMany();
  }

  async updateUserActivity(usuarioid: string, isActive: boolean): Promise<User | null> {
    
    const userToUpdate = await this.userRepository.findOne({ where: { usuarioid } });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    userToUpdate.isActive = isActive;
    return this.userRepository.save(userToUpdate);
  }

  async updatePassword(usuarioid: string, password: string): Promise<any> {
    const userToUpdate = await this.userRepository.findOne({ where: { usuarioid } });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await userToUpdate.hashPasswordBeforeInsert();
    userToUpdate.password = hashedPassword;
    return await this.userRepository.save(userToUpdate);
  } 

  async updateUserRole(
    usuarioid:string, 
    rolid: string, 
    ): Promise<any>{
      const userToUpdate = await this.userRepository.findOne({ where: { usuarioid } });
      if (!userToUpdate) {
        throw new NotFoundException('User not found');
      }
      const role = await this.roleRepository.findOne({ where: { rolid } }); //think theres an error in this line, don't know how it gets rol from role.repos
      if (!role) {
        throw new NotFoundException('Role not found'); //it's throwing this error, I tried changing from rolid to rol here but it doesn't change anything, I don't know why.
      }
    
      userToUpdate.rol = role; // Assign the role as an array, need to change this as no longer a many to many 
    
      return this.userRepository.save(userToUpdate);
    }
 

// Commenting out this here, getting no terminal errors, but when I try update values on Thunderclient I get a 404 error. Going to leave this here but divide the big function into smaller, more specific patch methods.
/*   async updateUser(
    usuarioid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const userToUpdate = await this.userRepository.findOne({
      where: { usuarioid },
      relations: ['rol'],
    });

    if (!userToUpdate) {
      // if user with the given ID doesn't exist
      throw new NotFoundException('User not found');
    }
    // Update the user with the fields provided in the DTO
    if (updateUserDto.nombre !== undefined) {
      userToUpdate.nombre = updateUserDto.nombre;
    }

    if (updateUserDto.apellidos !== undefined) {
      userToUpdate.apellidos = updateUserDto.apellidos;
    }

    if (updateUserDto.password !== undefined) {
      userToUpdate.password = updateUserDto.password;
    }

    if (updateUserDto.usuarioImg !== undefined) {
      userToUpdate.usuarioImg = updateUserDto.usuarioImg;
    }

    if (updateUserDto.rol !== undefined) {
      const role = await this.roleRepository.findOne({
        where: { rolId: updateUserDto.rol },
      });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      userToUpdate.rol = [role];
    }

    if (updateUserDto.isActive !== undefined) {
      userToUpdate.isActive = updateUserDto.isActive;
    }

    return this.userRepository.save(userToUpdate);
  } */
}
