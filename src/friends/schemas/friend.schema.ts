import { Prop, Schema} from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema()
export class Friend{
  
  @Prop({unique: true, type: Types.ObjectId})
  _id: ObjectId;

  @Prop()
  nickname: string;
}
