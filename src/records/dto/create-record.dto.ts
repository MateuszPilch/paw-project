
export class CreateRecordDto
{
  readonly id_sender: string;
  readonly id_receiver: string;
  readonly title: string;
  readonly amount: number;
  readonly description?: string;
}