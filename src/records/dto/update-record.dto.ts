import { ObjectId } from "mongoose";

export class UpdateRecordDto
{
  readonly id_sender: ObjectId;
  readonly id_receiver: ObjectId;
  readonly title: string;
  readonly amount: number;
  readonly description?: string;
}