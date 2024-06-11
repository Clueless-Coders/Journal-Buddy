import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RolesGuard],
  imports: [PrismaModule],
  exports: [RolesGuard],
})
export class GuardsModule {}
