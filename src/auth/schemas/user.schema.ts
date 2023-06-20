import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Record } from '../../records/schemas/record.schema';
import { Friend } from 'src/friends/schemas/friend.schema';

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
  friends: Friend[]; 

  @Prop()
  settings: Record[];
}

export const UserSchema = SchemaFactory.createForClass(User);
