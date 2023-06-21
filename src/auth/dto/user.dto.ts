import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserDto {
  
  @IsNotEmpty()
  readonly _id: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
