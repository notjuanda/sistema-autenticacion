import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Pérez' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'juan@email.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 6 })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, example: UserRole.ADMIN_ELECCIONES })
    @IsNotEmpty()
    @IsEnum(UserRole)
    rol: UserRole;
} 