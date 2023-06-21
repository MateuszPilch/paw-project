import { Prop, Schema} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema()
export class Friend extends Document{
  
  @Prop({unique: true, type: Types.ObjectId})
  _id: ObjectId;

  @Prop()
  nickname: string;
}
