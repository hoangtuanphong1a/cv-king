import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
}

export class UpdateBlogCategoryDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  Name: string;
}
