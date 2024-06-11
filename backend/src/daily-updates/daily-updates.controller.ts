import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdatesDto } from './dto';
import { Request } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('daily')
export class DailyUpdatesController {
  constructor(private DailyUpdateService: DailyUpdatesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('today')
  getToday(@Req() request: Request) {
    console.log('user from controller' + JSON.stringify(request.user));
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCertainDay(@Body() dto: DailyUpdatesDto, @Req() request: Request) {
    console.log(request.user);
    console.log({
      date: dto.date,
    });
    const day = new Date(dto.date);
    day.setUTCHours(0, 0, 0, 0);
    return this.DailyUpdateService.getCertainDay(day);
  }
}
