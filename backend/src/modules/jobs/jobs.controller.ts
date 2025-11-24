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
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { JobsRepository } from './jobs.repository';

import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly repo: JobsRepository) { }

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
    // Chỉ coi là “lọc” khi thực sự có filter ngoài page/limit/sort
    const hasFilters = !!(
      query.keyword ||
      query.location ||
      query.categoryId ||
      query.salaryMin !== undefined ||
      query.salaryMax !== undefined ||
      query.jobType ||
      query.companyId ||
      query.skillIds ||
      query.tagIds
    );

    if (hasFilters) {
      const result = await this.repo.findFiltered(query);
      return {
        status: 'success',
        message: 'Filtered jobs',
        data: result.data,
        meta: {
          count: result.total,
          page: query.page ?? 1,
          limit: query.limit ?? 10,
          totalPages: Math.ceil((result.total || 0) / (query.limit ?? 10)),
        },
      };
    } else {
      // Không truyền filter -> dùng SP_GetFilteredJobs với page/limit mặc định
      const result = await this.repo.findFiltered({
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        sortBy: query.sortBy ?? 'posted_at',
        sortOrder: query.sortOrder ?? 'DESC',
      } as FilterJobsDto);

      return {
        status: 'success',
        message: 'All jobs (paged)',
        data: result.data,
        meta: {
          count: result.total,
          page: query.page ?? 1,
          limit: query.limit ?? 10,
          totalPages: Math.ceil((result.total || 0) / (query.limit ?? 10)),
        },
      };
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found job', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created job', data };
  }

  @Put()
  async update(
    @Body(ValidationPipe) dto: UpdateJobDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated job', data };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted job', data: null };
  }

  //Jobs
  
}
