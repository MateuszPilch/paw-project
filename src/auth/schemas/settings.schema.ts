import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Settings{
  
  @Prop({ default: 'light' })
  theme: string;
}
