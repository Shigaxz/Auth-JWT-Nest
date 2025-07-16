import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    // Método para validar al usuario con email y contraseña
    async validateUser(email: string, password: string): Promise<any> {
        // Buscar al usuario por email
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.isActive && (await bcrypt.compare(password, user.password))) {
            // Si el usuario existe, está activo y la contraseña es correcta, retornamos el usuario sin la contraseña
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    // Método para generar el token JWT
    async login(user: any) {
        // Payload es la informacion del token JWT
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
