import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Record{
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'})
  id_sender: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'})
  id_receiver: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);