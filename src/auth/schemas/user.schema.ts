import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Friend } from '../../friends/schemas/friend.schema';
import { Settings } from './settings.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {

  @Prop()
  nickname: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop()
  password: string;
  
  @Prop()
  friends: Friend[]; 

  @Prop()
  settings: Settings;
}

export const UserSchema = SchemaFactory.createForClass(User);
