import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Daily, Quote } from '@prisma/client';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodayDto } from './dto';

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
    this.createDaily();
  }

  /***
   * Creates a new entry for daily data with a daily quote and a daily journal prompt.
   * This is set by either parameters or fetched from ZenQuotes and ChatGPT. Automatically excecuted every day at 1 AM
   *
   * @param newDaily The daily data to be set. Fetches data if not provided.
   * @param day The day this record will be created for. Defaults to the day this was requested.
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'CreateDaily',
  })
  async createDaily(newDaily?: UpdateTodayDto, day?: Date) {
    const now = day ? day : new Date();
    now.setUTCHours(0, 0, 0, 0);

    const latestDaily = await this.prismaService.daily.findFirst({
      where: {
        createdAt: now,
      },
    });

    if (latestDaily) {
      console.log('Daily already created today');
      return { message: 'Daily already created today' };
    }

    console.log(now.toISOString() + ' updating daily data...');

    let quote: { quote: string; author: string };
    let prompt: string;
    if (!newDaily) {
      quote = await this.getQuote();
      prompt = await this.getPrompt();
    } else {
      prompt = newDaily.prompt;
      quote = newDaily.quote;
    }
    return await this.prismaService.daily.create({
      data: {
        prompt,
        createdAt: now,
        dayCreated: now.toUTCString(),
        quote: {
          create: {
            quote: quote.quote,
            author: quote.author,
          },
        },
      },
    });
  }

  /***
   * Fetches quote of the day from the ZenQuotes API
   *
   * @returns Quote and author data that it fetches
   */
  async getQuote() {
    const resp = await fetch(this.quoteURL);
    const respJSON = await resp.json();
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

  /***
   * Fetches daily journal prompt by asking ChatGPT
   *
   * @returns String of the response from ChatGPT
   */
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

  /***
   * Looks up date provided and returns the daily data for that day
   *
   * @param day the day for which the data was created on (can be any time)
   * @returns the daily data for that date
   */
  async getCertainDay(day: Date): Promise<Daily> {
    day.setUTCHours(0, 0, 0, 0);
    const data = await this.prismaService.daily.findFirst({
      where: {
        createdAt: day,
      },
      include: { quote: true },
    });

    if (!data) {
      throw new NotFoundException('No entry for this day');
    }
    return data;
  }

  /***
   * Updates the data for the day provided with the daily data provided
   *
   * @param day the day for which the data was created on (can be any time)
   * @param prompt string of the prompt to be set
   * @param quote object containing the quote and the author
   */
  async updateDay(
    day: Date,
    prompt: string,
    quote: { quote: string; author: string },
  ) {
    day.setUTCHours(0, 0, 0, 0);
    await this.prismaService.daily.update({
      where: {
        createdAt: day,
        dayCreated: day.toUTCString(),
      },
      data: {
        quote: {
          update: {
            quote: quote.quote,
            author: quote.author,
          },
        },
        prompt,
      },
      include: { quote: true },
    });
  }
}
