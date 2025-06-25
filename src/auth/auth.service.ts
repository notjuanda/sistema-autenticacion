import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { sub: user.id, rol: user.rol };
        const token = await this.jwtService.signAsync(payload);
        return {
        access_token: token,
        user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
        },
        };
    }
}
