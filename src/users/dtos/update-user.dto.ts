import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 6 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password?: string;

  @IsOptional()
  @IsString()
  usuarioImg?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  rol?: string;
  //getting errors with the patch for updating user rol

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El nombre tiene que tener al menos 2 carácteres.' })
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'El apellido tiene que tener al menos 2 carácteres.' })
  apellidos?: string;
}
