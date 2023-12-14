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
    return await this.userService.findUserById(usuarioid);
  }

  @Get('role/:roleName')
  async findUsersByRole(@Param('roleName') roleName: string): Promise<User[]> {
    return await this.userService.findUsersByRole(roleName);
  }

  @Patch('update/password/:usuarioid')
  async updateUserPassword(
    @Param('usuarioid') usuarioid: string,
    @Body('password') password: string,
  ): Promise<any>{
    return await this.userService.updatePassword(usuarioid, password);
  }

  @Patch('update/activity/:usuarioid')
  async updateUserActivity(
    @Param('usuarioid') usuarioid: string,
    @Body('isActive') isActive: boolean,
  ): Promise<User | null>{
    return this.userService.updateUserActivity(usuarioid, isActive);
  }

  @Patch('update/rol/:usuarioid')
  async updateUserRole(
    @Param('usuarioid') usuarioid: string,
    @Body('rolid') rol: string,
  ): Promise<User | null>{
    return this.userService.updateUserRole(usuarioid, rol);
  }

/*   @Patch('update/:usuarioid')
  async updateUser(
    @Param('usuarioid') usuarioid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(usuarioid, updateUserDto);
  } */
}
