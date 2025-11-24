import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateJobCategoryDto } from './dtos/CreateJobCategoryDto';
import { UpdateJobCategoryDto } from './dtos/UpdateJobCategoryDto';

@Injectable()
export class JobCategoriesRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<any[]> {
    const results = await this.em
      .getConnection()
      .execute('EXEC SP_GetAllJobCategories');
    return results ?? [];
  }

  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobCategoryById ?', [id]);
    return result?.[0] ?? null;
  }

  async create(createDto: CreateJobCategoryDto): Promise<any> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_InsertJobCategory ?', [createDto.Name]);
    return result?.[0] ?? result;
  }

  async update(updateDto: UpdateJobCategoryDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJobCategory ?, ?', [
        updateDto.id,
        updateDto.Name,
      ]);
    return this.findOne(updateDto.id);
  }

  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteJobCategory ?', [id]);
    return true;
  }
}
