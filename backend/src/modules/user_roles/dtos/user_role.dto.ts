import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  userId: string;

  @IsString()
  roleId: string;
}

export class UpdateUserRoleDto extends CreateUserRoleDto { 
}
