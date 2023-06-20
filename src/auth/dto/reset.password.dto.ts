import {IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'new password is too short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'new password is too weak' })
  readonly password: string;
  
}
