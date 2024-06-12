import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, Roles } from 'src/auth/decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { IPayload, Role } from 'src/Types';
import { JournalsService } from './journals.service';
import { NewJournalDto } from './dto';
import { User } from '@prisma/client';

@Controller('journals')
export class JournalsController {
  constructor(private journalsService: JournalsService) {}

  @Roles(Role.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  newJournal(@GetUser() user: IPayload, @Body() dto: NewJournalDto) {
    console.log('User: ' + JSON.stringify(user));
    console.log('Journal Create DTO: ' + dto);
    return this.journalsService.createJournalForUser(user.sub, dto.entry);
  }

  @Roles(Role.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  getJournals(@GetUser() user: IPayload) {
    return this.journalsService.getAllJournalsForUser(user.sub);
  }

  @Roles(Role.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch()
  updateJournal() {}

  @Roles(Role.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete()
  deleteJournal() {}

  @Roles(Role.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  getAll() {}

  @Roles(Role.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  getJournalById(@Param() params: any) {}
}
