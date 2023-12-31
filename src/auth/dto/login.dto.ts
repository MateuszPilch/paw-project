import { IsEmail, IsNotEmpty, IsString} from '@nestjs/class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
