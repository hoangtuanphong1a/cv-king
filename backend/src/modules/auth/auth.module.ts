import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { Users } from '@entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles.module';
import { UserRolesModule } from '@modules/user_roles/user_roles.module';
import { JwtService } from './services/jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { Users } from '@entities/user.entity';
import { JobSeekerProfile } from '@entities/job-seeker-profile.entity';
import { Company } from '@entities/company.entity';
import { EmployerProfile } from '@entities/employer-profile.entity';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    UserRolesModule,
    MikroOrmModule.forFeature([
      Users,
      JobSeekerProfile,
      Company,
      EmployerProfile,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    JwtService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
