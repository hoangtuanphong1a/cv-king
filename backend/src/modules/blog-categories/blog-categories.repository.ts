import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/blog-category.dto';

@Injectable()
export class BlogCategoriesRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<any[]> {
    const results = await this.em
      .getConnection()
      .execute('EXEC SP_GetAllBlogCategories');
    return results ?? [];
  }

  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetBlogCategoryById ?', [id]);
    return result?.[0] ?? null;
  }

  async create(createDto: CreateBlogCategoryDto): Promise<any> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_InsertBlogCategory ?', [createDto.Name]);
    return result?.[0] ?? result;
  }

  async update(updateDto: UpdateBlogCategoryDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateBlogCategory ?, ?', [
        updateDto.id,
        updateDto.Name,
      ]);
    return this.findOne(updateDto.id);
  }

  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteBlogCategory ?', [id]);
    return true;
  }
}
