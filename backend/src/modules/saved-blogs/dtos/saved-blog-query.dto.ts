import { IsNumber, IsOptional, Min, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class SavedBlogQueryDto {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(['savedAt', 'title', 'createdAt'])
  sortBy?: string = 'savedAt';

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: string = 'DESC';
}
