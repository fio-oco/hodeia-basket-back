import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsUUID,
    Matches,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,20}$/;
// Must contain one lowercase letter, one uppercase, one digit, one special character (@$!%*?&) and be between 6 and 20 characters long

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'El nombre tiene que tener al menos 2 carácteres.' })
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(2, { message: 'El apellido tiene que tener al menos 2 carácteres.' })
  @IsNotEmpty()
  apellidos: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Por favor introduzca un email válido.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  genero: string;

//@IsNotEmpty()
  @IsString()
  @IsUUID() 
  rol: string; 

//Not sure how the login will have to work here to distinguish between accounts, maybe admin can send a special code to referees/ coaches or change their status or sth like that after they create their own accounts.. we have to rethink this.  
//need to decide if we want to include gender and userImg here too or maybe as updates
  /* @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string; */

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 6 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

}