import { IsString, IsNotEmpty, IsUUID, IsInt } from 'class-validator';
import { Player } from './player.entity';
import { Team } from 'src/teams/team.entity';

export class CreatePlayerDTO{

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsInt()
    dorsal: number;

    @IsNotEmpty()
    @IsUUID('4')
    equipoid: Team;

/*     @IsInt()
    puntuacion: number;

    @IsInt()
    faltas: number; */

    @IsNotEmpty()
    @IsString()
    genero: string;

}