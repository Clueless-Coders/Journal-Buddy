import { IsNotEmptyObject, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTodayDto {
  @IsNotEmptyObject()
  quote: {
    quote: string;
    author: string;
  };

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
