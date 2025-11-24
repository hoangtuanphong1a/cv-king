import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  id: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  roleName: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description: string;
}
