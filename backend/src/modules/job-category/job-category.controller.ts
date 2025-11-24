import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { JobCategoriesRepository } from './job-category.repository';
import { CreateJobCategoryDto } from './dtos/CreateJobCategoryDto';
import { UpdateJobCategoryDto } from './dtos/UpdateJobCategoryDto';

@ApiTags('job-categories')
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly repo: JobCategoriesRepository) {}

  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All categories',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found category', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobCategoryDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created', data };
  }

  @Put()
  async update(
    @Body(ValidationPipe) dto: UpdateJobCategoryDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated', data };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted', data: null };
  }
}
