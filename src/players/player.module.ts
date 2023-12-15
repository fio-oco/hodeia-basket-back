import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Team } from 'src/teams/team.entity';
import { Player } from './player.entity';
import { Substitution } from 'src/substitutions/substitution.entity';

@Module({  
    imports: [TypeOrmModule.forFeature([Player, Team, Substitution])],
    controllers: [PlayerController],
    providers: [PlayerService]
})
export class PlayerModule {
}
