import {IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {

  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8,{message: 'New password is too short'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'New password is too weak'})
  readonly newPassword: string;
}
