import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Juan Pérez' })
    @Column({ length: 100 })
    nombre: string;

    @ApiProperty({ example: 'juan@email.com' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: 'hashedpassword', description: 'Contraseña hasheada' })
    @Column()
    password: string;

    @ApiProperty({ enum: UserRole, example: UserRole.ADMIN_ELECCIONES })
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADMIN_ELECCIONES,
    })
    rol: UserRole;
} 