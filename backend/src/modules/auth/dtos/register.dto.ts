import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
export class RegisterDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  @IsString()
  fullName: string;
}

export class registerEmployeeDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  companyName: string;

  @IsString()
  contactName: string;
}
