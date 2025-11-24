import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'access_secret',
      ignoreExpiration: false,
    });
    console.log('verify secret', process.env.JWT_ACCESS_SECRET || 'access_secret');

  }

  async validate(payload: any) {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Token không phải là access token');
    }
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Người dùng không hợp lệ');
    }
    return payload;
  }
}