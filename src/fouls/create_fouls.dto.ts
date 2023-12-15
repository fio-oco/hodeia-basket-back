import { IsUUID, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFoulDTO {
  /* @IsUUID('4', { message: 'puntoid should be a valid UUID version 4' })
  faltaid: string; */

  @IsNotEmpty()
  @IsUUID('4', { message: 'jugadorid should be a valid UUID version 4' })
  jugadorid: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'partidoid should be a valid UUID version 4' })
  partidoid: string;

  @IsOptional()
  @IsDate({ message: 'marcatiempo should be a valid Date' })
  marcatiempo?: Date;

}