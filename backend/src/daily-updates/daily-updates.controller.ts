import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdatesDto } from './dto';

@Controller('daily')
export class DailyUpdatesController {
  constructor(private DailyUpdateService: DailyUpdatesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('today')
  getToday() {
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCertainDay(@Body() dto: DailyUpdatesDto) {
    console.log({
      date: dto.date,
    });
    const day = new Date(dto.date);
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }
}
