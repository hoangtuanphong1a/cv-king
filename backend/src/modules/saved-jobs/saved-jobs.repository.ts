import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { SavedJob } from '../../entities/saved-job.entity';

@Injectable()
export class SavedJobsRepository {
  constructor(
    @InjectRepository(SavedJob)
    private readonly savedJobRepository: EntityRepository<SavedJob>,
    private readonly em: EntityManager
  ) {}

  create(data: Partial<SavedJob>): SavedJob {
    return this.savedJobRepository.create({ ...data, id: undefined });
  }

  async persistAndFlush(entity: SavedJob): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  async findAndCount(where: any, options: any): Promise<[SavedJob[], number]> {
    return this.savedJobRepository.findAndCount(where, options);
  }

  async findOne(idOrWhere: any, options?: any): Promise<SavedJob | null> {
    return this.savedJobRepository.findOne(idOrWhere, options);
  }

  async removeAndFlush(entity: SavedJob): Promise<void> {
    await this.em.removeAndFlush(entity);
  }
}
