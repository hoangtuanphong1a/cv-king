import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JobTag } from '../../entities/job-tag.entity';
import { CreateJobTagDto, UpdateJobTagDto } from './dtos/job-tag.dto';

@Injectable()
export class JobTagsRepository {
  constructor(
    @InjectRepository(JobTag)
    private readonly repo: EntityRepository<JobTag>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all job tags
   * @returns List of all job tags
   */
  async findAll(): Promise<JobTag[]> {
    return this.repo.findAll({ orderBy: { createdAt: -1 } });
  }

  /**
   * Find a job tag by ID
   * @param id ID of the job tag
   * @returns JobTag or null if not found
   */
  async findOne(id: string): Promise<JobTag | null> {
    return this.repo.findOne({ id });
  }

  /**
   * Create a new job tag
   * @param createJobTagDto Data to create the job tag
   * @returns Created job tag
   */
  async create(createJobTagDto: CreateJobTagDto): Promise<JobTag> {
    const jobTag = this.repo.create({ Name: createJobTagDto.Name });
    await this.em.persistAndFlush(jobTag);
    return jobTag;
  }

  /**
   * Update a job tag
   * @param updateJobTagDto Data to update the job tag
   * @returns Updated job tag or null if not found
   */
  async update(updateJobTagDto: UpdateJobTagDto): Promise<JobTag> {
    const jobTag = await this.findOne(updateJobTagDto.id);
    if (!jobTag) {
      throw new NotFoundException('Job tag not found');
    }

    this.repo.assign(jobTag, { Name: updateJobTagDto.Name });
    await this.em.flush();
    return jobTag;
  }

  /**
   * Delete a job tag
   * @param id ID of the job tag to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const jobTag = await this.findOne(id);
    if (!jobTag) {
      return false;
    }

    await this.em.removeAndFlush(jobTag);
    return true;
  }
}
