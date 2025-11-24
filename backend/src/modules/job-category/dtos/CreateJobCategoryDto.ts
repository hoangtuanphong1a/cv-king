import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobCategoryDto {
  @IsNotEmpty()
  @IsString()
  Name: string;
}
