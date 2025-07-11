import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  const allowedOrigins = [
    process.env.URL_FRONT_ADMIN_ELECTORAL,
    process.env.URL_FRONT_SUPER_ADMIN,
    process.env.URL_FRONT_JURADOS,
    process.env.URL_FRONT_PADRON
  ].filter(Boolean);
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Usuarios y Accesos')
    .setDescription('API para la gestión de usuarios y roles con autenticación JWT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
