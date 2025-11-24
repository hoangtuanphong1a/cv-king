import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SavedJob } from '../../entities/saved-job.entity';
import { Job } from '../../entities/job.entity';
// import { Users } from '../../entities/user.entity';
import { SavedJobQueryDto } from './dtos/saved-job-query.dto';
import { SavedJobsRepository } from './saved-jobs.repository';

@Injectable()
export class SavedJobsService {
  constructor(
    private readonly savedJobsRepository: SavedJobsRepository,
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async saveJob(jobId: string, user: any): Promise<SavedJob> {
    // Check if job exists
    const job = await this.jobRepository.findOneOrFail({ id: jobId });

    // Check if already saved
    const existingSavedJob = await this.savedJobsRepository.findOne({
      jobId,
      jobSeekerId: user.id,
    });

    if (existingSavedJob) {
      throw new ConflictException('Job is already saved');
    }

    const savedJob = this.savedJobsRepository.create({
      jobId,
      jobSeekerId: user.id,
    });

    await this.savedJobsRepository.persistAndFlush(savedJob);
    return savedJob;
  }

  async findAll(
    query: SavedJobQueryDto,
    user: any
  ): Promise<{ savedJobs: SavedJob[]; total: number }> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const [savedJobs, total] = await this.savedJobsRepository.findAndCount(
      { jobSeekerId: user.id },
      {
        limit,
        offset,
        orderBy: { savedAt: 'DESC' },
      }
    );

    return { savedJobs, total };
  }

  async findOne(id: string, user: any): Promise<SavedJob> {
    const savedJob = await this.savedJobsRepository.findOne(id);

    if (!savedJob) {
      throw new NotFoundException('Saved job not found');
    }

    if (savedJob.jobSeekerId !== user.id) {
      throw new NotFoundException('Saved job not found');
    }

    return savedJob;
  }

  async remove(id: string, user: any): Promise<void> {
    const savedJob = await this.findOne(id, user);
    await this.savedJobsRepository.removeAndFlush(savedJob);
  }

  async removeByJobId(jobId: string, user: any): Promise<void> {
    const savedJob = await this.savedJobsRepository.findOne({
      jobId,
      jobSeekerId: user.id,
    });

    if (!savedJob) {
      throw new NotFoundException('Saved job not found');
    }

    await this.savedJobsRepository.removeAndFlush(savedJob);
  }

  async isJobSaved(jobId: string, user: any): Promise<boolean> {
    const savedJob = await this.savedJobsRepository.findOne({
      jobId,
      jobSeekerId: user.id,
    });

    return !!savedJob;
  }
}
