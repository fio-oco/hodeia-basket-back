import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';


@Controller('users')
export class UsersController {
constructor(private readonly userService: UsersService){}

@Post('register')
async createUser(@Body() createUserDto: CreateUserDto){
    try {
        const createdUser = await this.userService.createUser(createUserDto);
        return createdUser;
      } catch (error) {
        throw error;
      }
}
   
}

/* @Get('all')
async getAllUsers(){
    return this.userService.getAllUsers();
} */
