import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Record {
  @Prop({ type:() => Object, required: true })
  id_sender: ObjectId;

  @Prop({ type:() => Object, required: true })
  id_receiver: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);