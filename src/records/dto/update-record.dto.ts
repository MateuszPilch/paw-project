import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateRecordDto
{

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
  
  @IsString()
  readonly description?: string;
}