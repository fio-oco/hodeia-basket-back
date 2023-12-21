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
    console.log(user);
    console.log(password);
    console.log(user.password);
    //getting errors at this point, the compare below returns false.
    const compared = await bcrypt.compare(password, user.password)
    console.log(compared);
    
    if (user && compared) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

//getting erros here with password match, discrepency with hashed password and received password, don't understand why.
/*   async validateUser(email: string, password: string) {
    console.log('Received credentials:', email, password);
  
    const user = await this.userService.findByEmail(email);
    console.log('Retrieved user from database:', user);
  
    if (user) {
        console.log('Stored Hashed Password:', user.password);
        console.log('Provided Password:', password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password: ', hashedPassword);

    const passwordsMatch = await bcrypt.compare(hashedPassword, user.password);
        console.log(passwordsMatch);
        //I keep on getting false here even though the password in correct..
    if (passwordsMatch) {
      console.log('Passwords match. User authenticated.');
      const { password: _, ...result } = user;
      return result;
    } else {
      console.log('Passwords do not match.');
      return null;
    }
  } else {
    console.log('User not found.');
    return null;
  }
    } */

  //need to ask about the sub here, should I add the rolid too so that the rol is also in the jwt token  (for assigning permisos etc.)
  async login(user: any) {
    const payload = { 
        email: user.email,
        sub: user.usuarioid.toString(),
        rol: user.rol,
    };    //might get errors here w. the role
    console.log(payload)
    return{
        rol: user.rol,
        access_token: this.jwtService.sign(payload),
    }
  }

}
