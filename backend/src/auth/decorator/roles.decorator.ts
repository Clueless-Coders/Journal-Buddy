import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/Types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
