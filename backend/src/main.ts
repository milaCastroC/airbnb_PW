import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Permitir solicitudes desde el origen del frontend
  app.enableCors({
    origin: 'http://localhost:3000',  // Dirección donde se ejecuta el frontend
    credentials: true,
  });
  
  await app.listen(3001); // Puerto donde corre el backend
}
bootstrap();
