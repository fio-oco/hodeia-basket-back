import { Body, Controller, Get, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    @Post('login')
    // @UseGuards(LocalAuthGuard)
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body.user.email, body.user.password);
        if(!user){
            throw new UnauthorizedException();
        }
        return await this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

    
}
