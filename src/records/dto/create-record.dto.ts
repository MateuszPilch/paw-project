import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRecordDto
{
  @IsNotEmpty()
  readonly id_receiver: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
  
  @IsString()
  readonly description?: string;
}