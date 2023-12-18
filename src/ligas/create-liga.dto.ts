// ligaid, nombre, genero

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLigaDTO{

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    genero: string;
}