import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  Name: string;
}

export class UpdateSkillDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  Name: string;
}
