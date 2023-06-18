import { IsEmail, IsNotEmpty, IsString} from '@nestjs/class-validator';

export class ForgotPasswordDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
