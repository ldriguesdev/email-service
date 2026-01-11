import type { IPayload, ITokenProvider } from '@modules/users/application/providers/token-provider.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenProvider implements ITokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: IPayload): string {
    return this.jwtService.sign(payload, { 
      secret: process.env.JWT_SECRET, 
      expiresIn: '15m' 
    });
  }

  generateRefreshToken(payload: IPayload): string {
    return this.jwtService.sign(payload, { 
      secret: process.env.JWT_REFRESH_SECRET, 
      expiresIn: '7d' 
    });
  }

  verify(token: string): IPayload {
    return this.jwtService.verify(token, {
       secret: process.env.JWT_REFRESH_SECRET 
    });
  }
}