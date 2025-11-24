import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsIn,
  MaxLength,
  IsBoolean,
  IsDateString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterBlogsDto {
  @ApiPropertyOptional({
    description: 'Search keyword for blog title, content, excerpt, or author',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  keyword?: string;

  @ApiPropertyOptional({ description: 'Blog category ID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Author user ID' })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiPropertyOptional({ description: 'Tags (comma-separated tag IDs)' })
  @IsOptional()
  @IsString()
  tagIds?: string;

  @ApiPropertyOptional({
    description: 'Blog status',
    enum: ['published', 'unpublished', 'draft'],
  })
  @IsOptional()
  @IsIn(['published', 'unpublished', 'draft'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Published status',
    type: 'boolean',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1) return true;
    if (value === 'false' || value === false || value === 0) return false;
    return undefined;
  })
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ description: 'Minimum views count' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  viewsCountMin?: number;

  @ApiPropertyOptional({ description: 'From date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'To date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: [
      'title', 'created_at', 'updated_at', 'published_at',
      'views_count', 'is_published'
    ],
    default: 'created_at',
  })
  @IsOptional()
  @IsIn([
    'title', 'created_at', 'updated_at', 'published_at',
    'views_count', 'is_published'
  ])
  sortBy?: string = 'created_at';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: string = 'DESC';

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    minimum: 1,
    default: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
