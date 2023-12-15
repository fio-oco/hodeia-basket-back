import { IsUUID, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubstitutionDTO {
  /* @IsUUID('4', { message: 'puntoid should be a valid UUID version 4' })
  puntoid: string; */

  @IsNotEmpty()
  @IsUUID('4', { message: 'jugadorid should be a valid UUID version 4' })
  jugador_entra: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'jugadorid should be a valid UUID version 4' })
  jugador_sale: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'partidoid should be a valid UUID version 4' })
  partidoid: string;

  @IsOptional()
  @IsDate({ message: 'marcatiempo should be a valid Date' })
  marcatiempocambio?: Date;

}