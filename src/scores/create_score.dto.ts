import { IsUUID, IsInt, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScoreDTO {
  /* @IsUUID('4', { message: 'puntoid should be a valid UUID version 4' })
  puntoid: string; */

  @IsNotEmpty()
  @IsUUID('4', { message: 'jugadorid should be a valid UUID version 4' })
  jugadorid: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'partidoid should be a valid UUID version 4' })
  partidoid: string;

  @IsOptional()
  @IsDate({ message: 'marcatiempo should be a valid timestamp' })
  marcatiempo?: Date;

  @IsNotEmpty()
  @IsInt({ message: 'puntos must be an integer' })
  puntos: number;
}