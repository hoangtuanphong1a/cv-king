import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobsRepository } from './jobs.repository';

import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/guards/roles.decorator';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly repo: JobsRepository) {}

  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
      })
    )
    query: FilterJobsDto
  ): Promise<ApiResponse<any>> {
    const result = await this.repo.findFiltered(query);
    const transformedData = result.data.map(job => this.transformJob(job));

    return {
      status: 'success',
      message: 'Jobs retrieved successfully',
      data: transformedData,
      meta: {
        count: result.total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        totalPages: Math.ceil((result.total || 0) / (query.limit ?? 10)),
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    const transformedData = data ? this.transformJob(data) : null;
    return { status: 'success', message: 'Found job', data: transformedData };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.createJobWithPopulate(dto);
    const transformedData = this.transformJob(data);
    return { status: 'success', message: 'Created job', data: transformedData };
  }

  @Put()
  async update(
    @Body(ValidationPipe) dto: UpdateJobDto
  ): Promise<ApiResponse<any>> {
    const { id, ...updateData } = dto;
    const data = await this.repo.update(id, updateData);
    return { status: 'success', message: 'Updated job', data };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted job', data: null };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<ApiResponse<any>> {
    const data = await this.repo.findBySlug(slug);
    return { status: 'success', message: 'Found job by slug', data };
  }

  /**
   * Transform job entity to match frontend expectations
   */
  private transformJob(job: any) {
    return {
      id: job.id,
      created_at: job.created_at,
      company_id: job.CompanyId,
      posted_by_user_id: job.PostedByUserId,
      title: job.Title,
      slug: job.Slug,
      short_description: job.ShortDescription,
      description: job.Description,
      requirements: job.Requirements,
      benefits: job.Benefits,
      salary_min: job.SalaryMin,
      salary_max: job.SalaryMax,
      currency: job.Currency,
      job_type: job.JobType,
      location: job.Location,
      category_id: job.CategoryId,
      status: job.Status,
      views_count: job.ViewsCount,
      posted_at: job.PostedAt,
      expires_at: job.ExpiresAt,
      category: job.category
        ? {
            id: job.category.id,
            Name: job.category.Name,
          }
        : null,
      company: job.company
        ? {
            id: job.company.id,
            Name: job.company.Name,
            slug: job.company.Slug,
            logo_url: job.company.LogoUrl,
            banner_url: job.company.BannerUrl,
            industry: job.company.Industry,
            company_size: job.company.CompanySize,
            website: job.company.Website,
            location: job.company.Location,
            description: job.company.Description,
            isVerified: job.company.IsVerified,
          }
        : null,
      skills:
        job.jobSkills?.getItems().map((jobSkill: any) => ({
          id: jobSkill.skill.id,
          Name: jobSkill.skill.Name,
        })) || [],
      tags:
        job.jobJobTags?.getItems().map((jobJobTag: any) => ({
          id: jobJobTag.jobTag.id,
          Name: jobJobTag.jobTag.Name,
        })) || [],
    };
  }
}
