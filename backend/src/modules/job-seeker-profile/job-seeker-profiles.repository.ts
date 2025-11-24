import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JobSeekerProfile } from '@entities/job-seeker-profile.entity';
import {
  CreateJobSeekerProfileDto,
  UpdateJobSeekerProfileDto,
} from './dtos/job-seeker-profile.dto';

@Injectable()
export class JobSeekerProfilesRepository {
  constructor(
    @InjectRepository(JobSeekerProfile)
    private readonly repo: EntityRepository<JobSeekerProfile>,
    private readonly em: EntityManager
  ) { }

  async findAll(): Promise<JobSeekerProfile[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<JobSeekerProfile> {
    const profile = await this.repo.findOne({ id });
    if (!profile) throw new NotFoundException('JobSeekerProfile not found');
    return profile;
  }

  async findByUserId(userId: string): Promise<JobSeekerProfile> {
    const profile = await this.repo.findOne({ userId });
    if (!profile) throw new NotFoundException('Job seeker profile not found');
    return profile;
  }

  async create(data: CreateJobSeekerProfileDto): Promise<JobSeekerProfile> {
    const profile = this.repo.create(data);
    await this.em.persistAndFlush(profile);
    return profile;
  }

  async update(
    id: string,
    data: UpdateJobSeekerProfileDto
  ): Promise<JobSeekerProfile> {
    const profile = await this.findOne(id);
    this.repo.assign(profile, data);
    await this.em.flush();
    return profile;
  }

  async remove(id: string): Promise<boolean> {
    const profile = await this.findOne(id);
    await this.em.removeAndFlush(profile);
    return true;
  }
}
