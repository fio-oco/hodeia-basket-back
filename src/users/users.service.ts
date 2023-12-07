import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        await user.hashPassword();  //saltrounds are specified in the user.entity
        return this.userRepository.save(user);
      }

/* 
MongoDB Function: 
    async createUser(body: any): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const newUser = new this.userModel({ ...body, password: hashedPassword });
    return await newUser.save();
} */

}