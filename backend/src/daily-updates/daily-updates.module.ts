import { Module } from '@nestjs/common';
import { DailyUpdatesService } from './daily-updates.service';

@Module({
  providers: [DailyUpdatesService],
})
export class DailyUpdatesModule {}
