import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto, registerEmployeeDto } from './dtos/register.dto';
import { loginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('register-employer')
  registerEmployer(@Body() dto: registerEmployeeDto) {
    return this.authService.registerEmployee(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken as string;
    return this.authService.refresh(userId, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout/:id')
  async logout(@Req() req) {
    const userId: string = req.user.sub; // đảm bảo là string
    return this.authService.logout(userId);
  }
}
