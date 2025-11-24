import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { JobSeekerProfile } from '@entities/job-seeker-profile.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { JobSeekerProfilesRepository } from './job-seeker-profiles.repository';
import {
  CreateJobSeekerProfileDto,
  UpdateJobSeekerProfileDto,
} from './dtos/job-seeker-profile.dto';

@ApiTags('job-seeker-profiles')
@Controller('job-seeker-profiles')
export class JobSeekerProfilesController {
  constructor(private readonly repo: JobSeekerProfilesRepository) { }

  @Get()
  async findAll(): Promise<ApiResponse<JobSeekerProfile[]>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All job seeker profiles',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<JobSeekerProfile>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Job seeker profile found', data };
  }
  @Get('by-user/:userId')
  async findByUserId(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<ApiResponse<JobSeekerProfile>> {
    const data = await this.repo.findByUserId(userId);
    return {
      status: 'success',
      message: `Job seeker profile of user ${userId}`,
      data,
    };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobSeekerProfileDto
  ): Promise<ApiResponse<JobSeekerProfile>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Job seeker profile created', data };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateJobSeekerProfileDto
  ): Promise<ApiResponse<JobSeekerProfile>> {
    const data = await this.repo.update(id, dto);
    return { status: 'success', message: 'Job seeker profile updated', data };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return {
      status: 'success',
      message: 'Job seeker profile deleted',
      data: null,
    };
  }
}
