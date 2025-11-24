import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @MinLength(6)
  password: string;
}
