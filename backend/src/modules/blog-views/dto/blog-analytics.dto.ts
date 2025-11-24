import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsIn,
  IsDateString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BlogAnalyticsDto {
  @ApiPropertyOptional({
    description: 'Blog post ID for specific analytics',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsOptional()
  @IsUUID()
  blogPostId?: string;

  @ApiPropertyOptional({
    description: 'Analytics period',
    enum: ['today', 'week', 'month', 'year', 'all'],
    default: 'all'
  })
  @IsOptional()
  @IsIn(['today', 'week', 'month', 'year', 'all'])
  period?: string = 'all';

  @ApiPropertyOptional({
    description: 'Start date for custom period (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional({
    description: 'End date for custom period (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({
    description: 'Group by field',
    enum: ['day', 'week', 'month'],
    default: 'day'
  })
  @IsOptional()
  @IsIn(['day', 'week', 'month'])
  groupBy?: string = 'day';

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
