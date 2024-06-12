import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JournalsService {
  constructor(private prismaService: PrismaService) {}

  async createJournalForUser(userID: number, journalEntry: string) {
    const data = await this.prismaService.journal.create({
      data: {
        entry: journalEntry,
        user: {
          connect: {
            id: userID,
          },
        },
      },
    });
    if (!data)
      throw new NotFoundException(`User of ID ${userID} does not exist`);
    return data;
  }

  async getAllJournalsForUser(userID: number) {
    const data = await this.prismaService.journal.findMany({
      where: {
        userID,
      },
    });
    console.log(data);
    return data;
  }
}
