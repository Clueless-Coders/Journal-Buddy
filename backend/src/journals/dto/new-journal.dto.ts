import { IsNotEmpty } from 'class-validator';

export class NewJournalDto {
  @IsNotEmpty()
  entry: string;
}
