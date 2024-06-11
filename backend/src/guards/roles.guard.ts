import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/Types';

export class RolesGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userFromRequest: JWTPayload = context
      .switchToHttp()
      .getRequest().user;

    const currUser = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: userFromRequest.email,
      },
    });

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    return requiredRoles.some((role) => currUser.roles.includes(role));
  }
}

interface JWTPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
