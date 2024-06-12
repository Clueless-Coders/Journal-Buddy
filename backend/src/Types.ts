export enum Role {
  admin = 'admin',
  user = 'user',
}

export interface IPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
