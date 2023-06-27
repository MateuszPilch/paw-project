import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Settings{
  
  @Prop({ default: 'light' })
  theme: string;

  @Prop({ default: 'eng' })
  language: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
