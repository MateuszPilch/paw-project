import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UserDto {
  
  @IsNotEmpty()
  readonly _id: ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
