import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}', 'public'],
        synchronize: false, //changing this to false stopped an error I was getting stating that roles had null values for nombre, don't understand why. 
        autoLoadEntities: true, // to autoload entities and avoid leaking implementation details to other parts of application/ breaking application domain boundaries.
        ssl: {
          rejectUnauthorized: false, 
        }
      }),
    }),
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
