import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors';


ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // React URL
    methods: ['GET', 'POST', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  });

  await app.listen(3000); 
}
bootstrap();
