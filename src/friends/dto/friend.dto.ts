import { IsNotEmpty, IsString} from '@nestjs/class-validator';
import { ObjectId } from 'mongoose';

export class FriendDto {

  @IsNotEmpty()
  @IsString()
  _id: ObjectId;
  
  @IsNotEmpty()
  @IsString()
  readonly nickname: string;
}
