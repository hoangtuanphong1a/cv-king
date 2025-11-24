import { JobTagsRepository } from './job-tags.repository';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import {
  CreateJobTagDto,
  UpdateJobTagDto,
} from '@modules/job-tags/dtos/job-tag.dto';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { JobTag } from '@entities/job-tag.entity';

@ApiTags('job-tags')
@Controller('job-tags')
export class JobTagsController {
  constructor(private readonly JobTagsRepo: JobTagsRepository) { }

  /**
   * Retrieve all job tags
   * @returns List of all job tags wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<JobTag[]>> {
    const jobTags = await this.JobTagsRepo.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all job tags',
      data: jobTags,
      meta: { count: jobTags.length },
    };
  }

  /**
   * Find a job tag by ID
   * @param id ID of the job tag
   * @returns Job tag wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<JobTag>> {
    const jobTag = await this.JobTagsRepo.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved job tag with ID ${id}`,
      data: jobTag,
    };
  }

  /**
   * Create a new job tag
   * @param createJobTagDto Data to create the job tag
   * @returns Created job tag wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createJobTagDto: CreateJobTagDto
  ): Promise<ApiResponse<any>> {
    const jobTag = await this.JobTagsRepo.create(createJobTagDto);
    return {
      status: 'success',
      message: 'Job tag created successfully',
      data: jobTag,
    };
  }

  /**
   * Update a job tag
   * @param updateJobTagDto Data to update the job tag
   * @returns Updated job tag wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateJobTagDto: UpdateJobTagDto
  ): Promise<ApiResponse<any>> {
    const jobTag = await this.JobTagsRepo.update(updateJobTagDto);
    return {
      status: 'success',
      message: `Job tag with ID ${updateJobTagDto.id} updated successfully`,
      data: jobTag,
    };
  }

  /**
   * Delete a job tag
   * @param id ID of the job tag to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.JobTagsRepo.delete(id);
    return {
      status: 'success',
      message: `Job tag with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
