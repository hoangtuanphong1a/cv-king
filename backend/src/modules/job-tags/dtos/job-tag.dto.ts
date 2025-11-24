import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateJobTagDto {
  @IsNotEmpty()
  @IsString()
  Name: string;
}

export class UpdateJobTagDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  Name: string;
}
