import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5432); //or should this be 3000??
}
bootstrap();
