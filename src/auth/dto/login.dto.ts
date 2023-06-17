import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
