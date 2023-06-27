import { Prop, Schema} from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Friend{
  
  @Prop({ unique: true })
  _id: mongoose.Types.ObjectId;

  @Prop()
  nickname: string;
}
