import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  // Aquí podrías definir propiedades si decides implementar registro (sign-up)
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}