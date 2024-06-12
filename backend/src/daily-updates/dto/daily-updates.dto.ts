import { isDate, IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class DailyUpdatesDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
