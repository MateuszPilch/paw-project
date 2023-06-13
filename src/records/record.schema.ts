import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})

export class Record {

  @Prop({ required: true })
  id_sender: string;

  @Prop({ required: true })
  id_receiver: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);