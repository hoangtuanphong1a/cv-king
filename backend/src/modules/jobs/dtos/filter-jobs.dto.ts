import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsIn,
  MaxLength,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterJobsDto {
  @ApiPropertyOptional({ description: 'Search keyword for job title, company name, or description', maxLength: 255 })
  @IsOptional() @IsString() @MaxLength(255)
  keyword?: string;

  @ApiPropertyOptional({ description: 'Job location', maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({ description: 'Job category ID (industry)' })
  @IsOptional() @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Minimum salary' })
  @IsOptional() @Type(() => Number) @IsNumber()
  salaryMin?: number;

  @ApiPropertyOptional({ description: 'Maximum salary' })
  @IsOptional() @Type(() => Number) @IsNumber()
  salaryMax?: number;

  @ApiPropertyOptional({
    description: 'Job type',
    enum: ['Toàn thời gian', 'Bán thời gian', 'Hợp đồng', 'Freelance'],
  })
  @IsOptional()
  @IsIn(['Toàn thời gian', 'Bán thời gian', 'Hợp đồng', 'Freelance'])
  jobType?: string;

  @ApiPropertyOptional({ description: 'Company ID' })
  @IsOptional() @IsUUID()
  companyId?: string;

  @ApiPropertyOptional({ description: 'Skills (comma-separated skill IDs)' })
  @IsOptional() @IsString()
  skillIds?: string;

  @ApiPropertyOptional({ description: 'Tags (comma-separated tag IDs)' })
  @IsOptional() @IsString()
  tagIds?: string;

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ['title', 'salary_min', 'salary_max', 'created_at', 'views_count'],
    default: 'created_at',
  })
  @IsOptional()
  @IsIn(['title', 'salary_min', 'salary_max', 'created_at', 'views_count'])
  sortBy?: string = 'created_at';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: string = 'DESC';

  @ApiPropertyOptional({ description: 'Page number for pagination', minimum: 1, default: 1 })
  @IsOptional() @Type(() => Number) @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, maximum: 100, default: 10 })
  @IsOptional() @Type(() => Number) @IsNumber() @Max(100)
  limit?: number = 10;
}
