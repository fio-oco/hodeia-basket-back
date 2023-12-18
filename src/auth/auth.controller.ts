import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() body: any, @Request() req: any) {
        return await this.authService.login(req.user);
    }
}
