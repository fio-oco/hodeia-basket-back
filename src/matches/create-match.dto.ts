import { IsString, IsNotEmpty, IsUUID, IsInt, Min, IsDate } from 'class-validator';
import { Team } from 'src/teams/team.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateMatchDTO {
   /*  @IsUUID('4', { message: 'partidoid should be a valid UUID version 4' })
    partidoid: string;
   */
    @IsNotEmpty()
    @IsDate({ message: 'fecha should be a valid Date' })
    fecha: Date;
  
    @IsNotEmpty()
    @IsUUID('4', { message: 'visitanteid should be a valid UUID version 4' })
    visitanteid: Team;
  
    @IsNotEmpty()
    @IsUUID('4', { message: 'localid should be a valid UUID version 4' })
    localid: Team;
  
    @IsUUID('4', { message: 'equipo_ganador should be a valid UUID version 4' })
    equipo_ganador: Team;
  
    @IsUUID('4', { message: 'equipo_perdedor should be a valid UUID version 4' })
    equipo_perdedor: Team;
  
    @IsNotEmpty()
    @IsUUID('4', { message: 'arbitroid should be a valid UUID version 4' })
    arbitroid: User;
  
    @IsInt({ message: 'fechatemporada must be an integer' })
    fechatemporada: number;
  
    @IsUUID('4', { message: 'ligaid should be a valid UUID version 4' })
    ligaid: string;
  
    @IsInt({ message: 'puntuacion_equipo_local must be an integer' })
    puntuacion_equipo_local: number;
  
    @IsInt({ message: 'puntuacion_equipo_visitante must be an integer' })
    puntuacion_equipo_visitante: number;
}