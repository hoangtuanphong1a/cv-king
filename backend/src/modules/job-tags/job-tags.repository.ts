import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { JobTag } from '@entities/job-tag.entity';
import { CreateJobTagDto, UpdateJobTagDto } from '@modules/job-tags/dtos/job-tag.dto';

@Injectable()
export class JobTagsRepository {
  constructor(
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all job tags
   * @returns List of all job tags
   */
  async findAll(): Promise<any> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllJobTags');
    return results ?? [];
  }

  /**
   * Find a job tag by ID
   * @param id ID of the job tag
   * @returns JobTag or null if not found
   */
  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobTagById ?', [id]);
    const jobTag = result?.[0] ?? result;
    return jobTag ?? null;
  }

  /**
   * Create a new job tag
   * @param createJobTagDto Data to create the job tag
   * @returns Created job tag
   */
  async create(createJobTagDto: CreateJobTagDto): Promise<any> {
    const result = this.em
      .getConnection()
      .execute('EXEC SP_InsertJobTag ?', [
        createJobTagDto.Name,
      ]);

    const newJobTag = result?.[0] ?? result;
    return newJobTag as any;
  }

  /**
   * Update a job tag
   * @param updateJobTagDto Data to update the job tag
   * @returns Updated job tag or null if not found
   */
  async update(updateJobTagDto: UpdateJobTagDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJobTag ?, ?', [
        updateJobTagDto.id,
        updateJobTagDto.Name,
      ]);
    return this.findOne(updateJobTagDto.id);
  }

  /**
   * Delete a job tag
   * @param id ID of the job tag to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteJobTag ?', [id]);
    return true;
  }
}
