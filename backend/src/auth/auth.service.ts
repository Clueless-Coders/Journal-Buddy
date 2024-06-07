import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

    return this.signToken(user.id, user.email);
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
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('User already exists');
      }
    }

    // return new user
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret: string = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
