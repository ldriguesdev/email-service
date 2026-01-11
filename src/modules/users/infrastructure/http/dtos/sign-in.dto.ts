import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  email: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString()
  password: string;
}
  