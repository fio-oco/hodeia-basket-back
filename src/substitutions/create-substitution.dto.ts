import { IsUUID, IsDate, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';

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
  @IsUUID('4', { message: 'partido_id should be a valid UUID version 4' })
  partido_id: string;

  @IsOptional()
  @IsDate({ message: 'marcatiempo should be a valid Date' })
  marcatiempocambio?: Date;

}