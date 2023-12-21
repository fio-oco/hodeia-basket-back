import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/users/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
  
    const compared = await bcrypt.compare(password, user.password)
    
    if (user && compared) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
        email: user.email,
        sub: user.usuarioid.toString(),
        rol: user.rol,
    };  
    console.log(payload)
    return{
        rol: user.rol,
        access_token: this.jwtService.sign(payload),
    }
  }

}
