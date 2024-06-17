import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/Types';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    //search for user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
        id: undefined,
      },
    });
    //if doesn't exist, throw error
    if (!user) throw new ForbiddenException('Invalid Credentials');
    //compare password
    if (!(await argon.verify(user.hash, dto.password)))
      throw new ForbiddenException('Invalid Credentials');
    //same? return user. otherwise throw exception

    return {
      access_token: await this.signToken(user.id, user.email),
      refresh_token: await this.generateRefreshToken(user.id, user.email),
    };
  }

  async signup(dto: AuthDto) {
    // gen hash
    const hash = await argon.hash(dto.password);
    // save user
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hash,
          roles: [Role.user],
        },
      });

      return {
        access_token: await this.signToken(user.id, user.email),
        refresh_token: await this.generateRefreshToken(user.id, user.email),
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('User already exists');
      }
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret: string = this.configService.get('JWT_SECRET');

    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }

  async generateRefreshToken(userID: number, email: string) {
    const secret: string = this.configService.get('REFRESH_JWT_SECRET');
    const payload = {
      sub: userID,
      email,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
  }

  async createTokenById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    return {
      access_token: await this.signToken(user.id, user.email),
    };
  }
}
