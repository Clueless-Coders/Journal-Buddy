import { isDate, IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class DailyUpdatesDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
