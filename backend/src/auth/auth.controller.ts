import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signup(dto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('refresh-jwt'))
  refresh(@GetUser() user: any) {
    console.log('refresh user ' + JSON.stringify(user));
    return this.authService.createTokenById(user.sub);
  }
}
