import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateRecordDto
{
  readonly id_sender: ObjectId;

  @IsNotEmpty()
  readonly id_receiver: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
  
  @IsString()
  readonly description?: string;
}