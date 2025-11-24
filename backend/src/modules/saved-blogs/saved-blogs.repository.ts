import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { SavedBlogQueryDto } from './dtos/saved-blog-query.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class SavedBlogsRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(
    userId: string,
    query: SavedBlogQueryDto
  ): Promise<{ data: any[]; total: number }> {
    const { page = 1, limit = 10, sortBy = 'savedAt', sortOrder = 'DESC' } = query;
    const safePage = Math.max(Number(page || 1), 1);
    const safeLimit = Math.max(Math.min(Number(limit || 10), 100), 1);
    const offset = (safePage - 1) * safeLimit;

    const raw = await this.em.getConnection().execute(
      'EXEC SP_GetSavedBlogs ?, ?, ?, ?',
      [userId, sortBy, sortOrder, safeLimit]
    );

    const row = Array.isArray(raw) ? raw[0] : null;
    const jsonText = row?.json_result ?? null;

    if (!jsonText) return { data: [], total: 0 };
    const list = JSON.parse(jsonText) as any[];
    const total = list?.[0]?.total ?? 0;

    return { data: list ?? [], total };
  }

  async findOne(id: string, userId: string): Promise<any | null> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetSavedBlogById ?, ?', [id, userId]);
    if (!raw?.[0]) return null;
    return extractJson(raw);
  }

  async saveBlog(blogPostId: string, userId: string): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_SaveBlog ?, ?', [blogPostId, userId]);
    return extractJson(raw);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_RemoveSavedBlog ?, ?', [id, userId]);
    return true;
  }

  async removeByBlogId(blogPostId: string, userId: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_RemoveSavedBlogByBlogId ?, ?', [blogPostId, userId]);
    return true;
  }

  async isBlogSaved(blogPostId: string, userId: string): Promise<boolean> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_IsBlogSaved ?, ?', [blogPostId, userId]);
    const result = extractJson(raw);
    return result?.isSaved || false;
  }
}
