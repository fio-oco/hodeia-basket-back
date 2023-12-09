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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    user.password = await user.hashPasswordBeforeInsert(); //saltrounds are specified in the user.entity
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async viewUser(usuarioid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { usuarioid } });
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
  } //this isn't working, I'm getting a 500 error saying that both salts and password are required, don't know what's up, might check my patches from the last project to see if I'm doing sth wrong here. 
 

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
