import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JobCategory } from '../../entities/job-category.entity';
import { CreateJobCategoryDto } from './dtos/CreateJobCategoryDto';
import { UpdateJobCategoryDto } from './dtos/UpdateJobCategoryDto';

@Injectable()
export class JobCategoriesRepository {
  constructor(
    @InjectRepository(JobCategory)
    private readonly repo: EntityRepository<JobCategory>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<JobCategory[]> {
    return this.repo.findAll({ orderBy: { createdAt: -1 } });
  }

  async findOne(id: string): Promise<JobCategory | null> {
    return this.repo.findOne({ id });
  }

  async create(createDto: CreateJobCategoryDto): Promise<JobCategory> {
    const category = this.repo.create({ Name: createDto.Name });
    await this.em.persistAndFlush(category);
    return category;
  }

  async update(updateDto: UpdateJobCategoryDto): Promise<JobCategory> {
    const category = await this.findOne(updateDto.id);
    if (!category) {
      throw new NotFoundException('Job category not found');
    }

    this.repo.assign(category, { Name: updateDto.Name });
    await this.em.flush();
    return category;
  }

  async delete(id: string): Promise<boolean> {
    const category = await this.findOne(id);
    if (!category) {
      return false;
    }

    await this.em.removeAndFlush(category);
    return true;
  }
}
