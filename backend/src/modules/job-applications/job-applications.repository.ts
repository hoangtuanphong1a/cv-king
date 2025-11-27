import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  JobApplication,
  ApplicationStatus,
} from '../../entities/job-application.entity';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';

@Injectable()
export class JobApplicationsRepository {
  constructor(
    @InjectRepository(JobApplication)
    private readonly repo: EntityRepository<JobApplication>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<JobApplication[]> {
    return this.repo.findAll({
      where: { isDeleted: false },
      orderBy: { appliedAt: -1 },
    });
  }

  async findOne(id: string): Promise<JobApplication | null> {
    return this.repo.findOne({ id, isDeleted: false });
  }

  async findByJobSeekerId(jobSeekerId: string): Promise<JobApplication[]> {
    return this.repo.findAll({
      where: { jobSeekerId, isDeleted: false },
      orderBy: { appliedAt: -1 },
    });
  }

  async findByCompanyId(companyId: string): Promise<JobApplication[]> {
    // This would need a join with Jobs table to get companyId
    // For now, return empty array as this method needs more complex implementation
    return [];
  }

  async create(dto: CreateJobApplicationDto): Promise<JobApplication> {
    const application = this.repo.create({
      jobId: dto.jobId,
      jobSeekerId: dto.jobSeekerId,
      coverLetter: dto.coverLetter,
      status: ApplicationStatus.PENDING,
      appliedAt: new Date(),
      isDeleted: false,
    });

    await this.em.persistAndFlush(application);
    return application;
  }

  async update(dto: UpdateJobApplicationDto): Promise<JobApplication> {
    const application = await this.findOne(dto.id);
    if (!application) {
      throw new NotFoundException('Job application not found');
    }

    this.repo.assign(application, {
      coverLetter: dto.coverLetter,
      status: dto.status,
    });

    await this.em.flush();
    return application;
  }

  async delete(id: string): Promise<boolean> {
    const application = await this.findOne(id);
    if (!application) {
      return false;
    }

    // Soft delete
    this.repo.assign(application, { isDeleted: true });
    await this.em.flush();
    return true;
  }
}
