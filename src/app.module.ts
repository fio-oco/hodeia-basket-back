import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { TeamController } from './teams/team.controller';
import { TeamModule } from './teams/team.module';
import { TeamService } from './teams/team.service';
import { Team } from './teams/team.entity';
import { LigaController } from './ligas/liga.controller';
import { LigaService } from './ligas/liga.service';
import { LigaModule } from './ligas/liga.module';
import { Liga } from './ligas/liga.entity';
import { PlayerService } from './players/player.service';
import { PlayerController } from './players/player.controller';
import { PlayerModule } from './players/player.module';
import { Player } from './players/player.entity';
import { MatchModule } from './matches/match.module';
import { Match } from './matches/match.entity';
import { Season } from './seasons/season.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SeasonTeamController } from './season_teams/season_team.controller';
import { SeasonTeamService } from './season_teams/season_team.service';
import { SeasonTeamModule } from './season_teams/season_team.module';
import { Season_Team } from './season_teams/season_team.entity';

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
    TypeOrmModule.forFeature([User, Role, Team, Liga, Player, Match, Season, Season_Team]),
    MatchModule,
    //PlayersModule,
    //LigasModule,
    //TeamModule
  
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SeasonTeamModule, 
  ],
  controllers: [AppController, UserController, TeamController, LigaController, PlayerController, SeasonTeamController],
  providers: [AppService, UserService, TeamService, LigaService, PlayerService, SeasonTeamService],
})
export class AppModule {}
