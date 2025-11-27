import { Injectable, NotFoundException } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepository) {}

  /**
   * Find all jobs with optional filtering
   */
  async findAll(filter?: FilterJobsDto) {
    if (filter) {
      return this.jobsRepository.findFiltered(filter);
    }
    return this.jobsRepository.findAll();
  }

  /**
   * Find a job by ID
   */
  async findOne(id: string) {
    const job = await this.jobsRepository.findOne(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  /**
   * Create a new job
   */
  async create(createJobDto: CreateJobDto) {
    return this.jobsRepository.createJob(createJobDto);
  }

  /**
   * Update an existing job
   */
  async update(id: string, updateJobDto: UpdateJobDto) {
    // Check if job exists
    await this.findOne(id);

    return this.jobsRepository.update(id, updateJobDto);
  }

  /**
   * Delete a job
   */
  async delete(id: string) {
    // Check if job exists
    await this.findOne(id);

    const deleted = await this.jobsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return { message: 'Job deleted successfully' };
  }

  /**
   * Find jobs by company
   */
  async findByCompany(companyId: string) {
    return this.jobsRepository.findByCompany(companyId);
  }

  /**
   * Find jobs posted by a user
   */
  async findByUser(userId: string) {
    return this.jobsRepository.findByUser(userId);
  }

  /**
   * Find active jobs
   */
  async findActive() {
    return this.jobsRepository.findActive();
  }

  /**
   * Increment job view count
   */
  async incrementViews(id: string) {
    await this.jobsRepository.incrementViews(id);
    return { message: 'View count incremented' };
  }

  /**
   * Get job statistics
   */
  async getStats() {
    const totalJobs = await this.jobsRepository.count();
    const activeJobs = await this.jobsRepository.count({ Status: 'Active' });
    const draftJobs = await this.jobsRepository.count({ Status: 'Draft' });
    const expiredJobs = await this.jobsRepository.count({ Status: 'Expired' });

    return {
      total: totalJobs,
      active: activeJobs,
      draft: draftJobs,
      expired: expiredJobs,
    };
  }
}
