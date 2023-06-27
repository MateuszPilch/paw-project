import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Record{
  @Prop({ required: true, ref: 'User' })
  id_sender: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  id_receiver: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);