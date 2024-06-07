import { Module } from '@nestjs/common';
import { DailyUpdatesService } from './daily-updates.service';

@Module({
  providers: [DailyUpdatesService],
  exports: [DailyUpdatesService],
})
export class DailyUpdatesModule {}
