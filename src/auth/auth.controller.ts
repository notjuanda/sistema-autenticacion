import { Controller, Post, Body, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión y obtener JWT' })
    @ApiBody({ schema: { properties: { email: { type: 'string', example: 'admin@admin.com' }, password: { type: 'string', example: 'admin123' } } } })
    @ApiResponse({ status: 201, description: 'JWT y datos del usuario', schema: { example: { access_token: 'jwt_token', user: { id: 1, nombre: 'Super Admin', email: 'admin@admin.com', rol: 'super_admin' } } } })
    async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.login(body.email, body.password);
        res.cookie('auth_token', result.access_token, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });
        return { user: result.user, access_token: result.access_token };
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Obtener el usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Usuario autenticado' })
    async me(@Req() req) {
        return this.authService.me(req.user.userId);
    }
}
