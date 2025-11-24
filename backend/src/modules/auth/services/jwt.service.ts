import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.nestJwtService.signAsync({ ...payload, type: 'access' });
  }
  async generateRefreshToken(payload: any): Promise<string> {
    return this.nestJwtService.signAsync(
      { ...payload, type: 'refresh' },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRATION_TIME'
        ),
      }
    );
  }
  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.nestJwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      if (payload.type !== 'access') {
        throw new UnauthorizedException('Not access token');
      }
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Access token không hợp lệ');
    }
  }
  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.nestJwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Not refresh token');
      }
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }
  }
}
