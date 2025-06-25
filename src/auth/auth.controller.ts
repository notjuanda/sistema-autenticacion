import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión y obtener JWT' })
    @ApiBody({ schema: { properties: { email: { type: 'string', example: 'admin@admin.com' }, password: { type: 'string', example: 'admin123' } } } })
    @ApiResponse({ status: 201, description: 'JWT y datos del usuario', schema: { example: { access_token: 'jwt_token', user: { id: 1, nombre: 'Super Admin', email: 'admin@admin.com', rol: 'super_admin' } } } })
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
}
