import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateJobDto {
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsUUID()
  postedByUserId?: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  benefits?: string;

  @IsOptional()
  @IsNumber()
  salaryMin?: number;

  @IsOptional()
  @IsNumber()
  salaryMax?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  jobType?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @IsArray()
  @IsString({ each: true })
  skillIds: string[];

  @IsArray()
  @IsString({ each: true })
  tagIds: string[];
}
