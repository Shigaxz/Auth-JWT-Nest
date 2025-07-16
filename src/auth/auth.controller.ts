import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    // Endpoint para iniciar sesión
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // Validar las credenciales del usuario
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            // Si las credenciales son incorrectas o el usuario no está verificado, lanza una excepción
            throw new UnauthorizedException('Credenciales incorrectas o usuario no verificado.');
        }
        return this.authService.login(user);
    }

    // Endpoint para obtener el perfil del usuario autenticado
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        // req.user es el objeto que retornamos en el método validate() de la JwtStrategy
        return req.user;
    }
}
