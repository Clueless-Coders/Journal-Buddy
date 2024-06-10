import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Daily, Quote } from '@prisma/client';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';
import { DailyUpdatesDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalServerError } from 'openai/error';

@Injectable()
export class DailyUpdatesService implements OnModuleInit {
  quoteURL: string;
  openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  onModuleInit() {
    this.quoteURL = this.configService.get('QUOTES_API_URL');
    const openAiKey = {
      organization: this.configService.get('OPEN_AI_ORG'),
      project: this.configService.get('OPEN_AI_PROJECT'),
      apiKey: this.configService.get('OPEN_AI_KEY'),
    };
    this.openai = new OpenAI(openAiKey);
    console.log('Initialized');
    this.createDaily();
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'CreateDaily',
  })
  async createDaily() {
    console.log(new Date().toISOString() + ' updating daily data');
    const quote = await this.getQuote();
    console.log({
      quote,
    });
    const prompt = await this.getPrompt();
    console.log({
      prompt,
    });

    await this.prismaService.daily.create({
      data: {
        prompt,
        createdAt: quote.createdOn,
        dayCreated: quote.dayCreated,
      },
    });

    await this.prismaService.quote.create({
      data: {
        ...quote,
      },
    });
    console.log(await this.prismaService.daily.findFirst());
  }

  async getQuote() {
    const resp = await fetch(this.quoteURL);
    const respJSON = await resp.json();
    console.log(respJSON);
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const newQuote: Quote = {
      quote: respJSON[0].q,
      author: respJSON[0].a,
      dayCreated: now.toUTCString(),
      createdOn: now,
    };
    return newQuote;
  }

  async getPrompt() {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a mental health expert 
        helping people think positively`,
        },
        {
          role: 'user',
          content:
            'Generate a journal topic for a user to write about in their journal',
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  }

  async getCertainDay(day: Date): Promise<Daily> {
    const data = await this.prismaService.daily.findFirst({
      where: {
        createdAt: day,
      },
    });
    console.log(day);
    console.log(data);

    if (!data) {
      throw new NotFoundException('No entry for this day');
    }
    return data;
  }
}
