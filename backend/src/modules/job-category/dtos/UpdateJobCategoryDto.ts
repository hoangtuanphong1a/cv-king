import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateJobCategoryDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  Name: string;
}
