import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FriendDto } from 'src/friends/dto/friend.dto';

@Schema({
  timestamps: true,
})
export class User extends Document{
  @Prop()
  nickname: string;

  @Prop({ unique: true, trim: true})
  email: string;

  @Prop()
  password: string;
  
  @Prop()
  friends: FriendDto[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);
