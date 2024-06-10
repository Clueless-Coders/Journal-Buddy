import { Module } from '@nestjs/common';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdatesController } from './daily-updates.controller';

@Module({
  providers: [DailyUpdatesService],
  controllers: [DailyUpdatesController],
  exports: [DailyUpdatesService],
})
export class DailyUpdatesModule {}
