import { Prop, Schema} from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class Friend extends Document{
  
  @Prop({unique: true})
  _id: ObjectId;

  @Prop()
  nickname: string;
}
