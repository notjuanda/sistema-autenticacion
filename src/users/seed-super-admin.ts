import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'sistema_autenticacion',
    entities: [User],
    synchronize: false,
});

async function seed() {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);

    const exists = await userRepository.findOne({ where: { email: 'admin@admin.com' } });
    if (exists) {
        console.log('El super administrador ya existe.');
        await AppDataSource.destroy();
        return;
    }

    const superAdmin = userRepository.create({
        nombre: 'Super Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin123', 10),
        rol: UserRole.SUPER_ADMIN,
    });
    await userRepository.save(superAdmin);
    console.log('Super administrador creado:', superAdmin.email);
    await AppDataSource.destroy();
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
}); 