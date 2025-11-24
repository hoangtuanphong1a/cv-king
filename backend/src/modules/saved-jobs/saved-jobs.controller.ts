import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { SavedJobsService } from './saved-jobs.service';
import { SavedJobQueryDto } from './dtos/saved-job-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { SavedJob } from '../../entities/saved-job.entity';
// import { Role } from '../../enums/role.enum';


@ApiTags('saved-jobs')
@Controller('saved-jobs')
@UseGuards(AuthGuard('jwt'))
@Roles('JobSeeker')
// @Roles('Employer', 'Admin')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post(':jobId')
  async saveJob(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Req() req
  ): Promise<ApiResponse<SavedJob>> {
    const saved = await this.savedJobsService.saveJob(jobId, req.user);
    return {
      status: 'success',
      message: 'Job saved successfully',
      data: saved,
    };
  }

  @Get()
  async findAll(
    @Query(ValidationPipe) query: SavedJobQueryDto,
    @Req() req
  ): Promise<ApiResponse<{ savedJobs: SavedJob[]; total: number }>> {
    const result = await this.savedJobsService.findAll(query, req.user);
    return {
      status: 'success',
      message: 'Successfully retrieved saved jobs',
      data: result,
      meta: {
        count: result.total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req
  ): Promise<ApiResponse<SavedJob>> {
    const item = await this.savedJobsService.findOne(id, req.user);
    return {
      status: 'success',
      message: 'Successfully retrieved saved job',
      data: item,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req
  ): Promise<ApiResponse<null>> {
    await this.savedJobsService.remove(id, req.user);
    return {
      status: 'success',
      message: 'Saved job removed successfully',
      data: null,
    };
  }

  @Delete('job/:jobId')
  async removeByJobId(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Req() req
  ): Promise<ApiResponse<null>> {
    await this.savedJobsService.removeByJobId(jobId, req.user);
    return {
      status: 'success',
      message: 'Saved job removed successfully',
      data: null,
    };
  }

  @Get('job/:jobId/check')
  async isJobSaved(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Req() req
  ): Promise<ApiResponse<{ isSaved: boolean }>> {
    const isSaved = await this.savedJobsService.isJobSaved(jobId, req.user);
    return {
      status: 'success',
      message: 'Saved job status',
      data: { isSaved },
    };
  }
}
