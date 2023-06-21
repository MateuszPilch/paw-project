import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Record{
  @Prop({ type: Types.ObjectId, required: true, ref: 'User'})
  id_sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User'})
  id_receiver: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);