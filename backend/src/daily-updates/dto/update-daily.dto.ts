import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { DailyUpdatesDto } from './daily-updates.dto';

export class UpdateDailyDto extends DailyUpdatesDto {
  @IsNotEmptyObject()
  quote: {
    quote: string;
    author: string;
  };

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
