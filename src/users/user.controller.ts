import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(createUserDto);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get('id/:usuarioid')
  async findOne(@Param('usuarioid') usuarioid: string): Promise<User> {
    return await this.userService.viewUser(usuarioid);
  }

  @Patch(':usuarioid/update-password')
  async updateUserPassword(
    @Param('usuarioid') usuarioid: string,
    @Body('newPassword') newPassword: string,
  ): Promise<any>{
    await this.userService.updatePassword(usuarioid, newPassword);
  }
  // in the climbs app, used @Request 


/*   @Patch('update/:usuarioid')
  async updateUser(
    @Param('usuarioid') usuarioid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(usuarioid, updateUserDto);
  } */
}
