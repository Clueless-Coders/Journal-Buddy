import { Module } from '@nestjs/common';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdatesController } from './daily-updates.controller';
import { GuardsModule } from 'src/guards/guards.module';

@Module({
  imports: [GuardsModule],
  providers: [DailyUpdatesService],
  controllers: [DailyUpdatesController],
  exports: [DailyUpdatesService],
})
export class DailyUpdatesModule {}
