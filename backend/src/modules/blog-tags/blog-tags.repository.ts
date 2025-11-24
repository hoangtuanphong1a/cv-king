import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateBlogTagDto, UpdateBlogTagDto } from './dto/blog-tag.dto';

@Injectable()
export class BlogTagsRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<any[]> {
    const results = await this.em
      .getConnection()
      .execute('EXEC SP_GetAllBlogTags');
    return results ?? [];
  }

  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetBlogTagById ?', [id]);
    return result?.[0] ?? null;
  }

  async create(createDto: CreateBlogTagDto): Promise<any> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_InsertBlogTag ?', [createDto.Name]);
    return result?.[0] ?? result;
  }

  async update(updateDto: UpdateBlogTagDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateBlogTag ?, ?', [updateDto.id, updateDto.Name]);
    return this.findOne(updateDto.id);
  }

  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteBlogTag ?', [id]);
    return true;
  }
}
