import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SavedBlog } from '../../entities/saved-blog.entity';
import { SavedBlogQueryDto } from './dtos/saved-blog-query.dto';

@Injectable()
export class SavedBlogsRepository {
  constructor(
    @InjectRepository(SavedBlog)
    private readonly repo: EntityRepository<SavedBlog>,
    private readonly em: EntityManager
  ) {}

  async findAll(
    userId: string,
    query: SavedBlogQueryDto
  ): Promise<{ data: SavedBlog[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;
    const safePage = Math.max(Number(page || 1), 1);
    const safeLimit = Math.max(Math.min(Number(limit || 10), 100), 1);
    const offset = (safePage - 1) * safeLimit;

    const [data, total] = await this.repo.findAndCount(
      { userId },
      {
        limit: safeLimit,
        offset,
        orderBy: { [sortBy]: sortOrder === 'DESC' ? -1 : 1 },
      }
    );

    return { data, total };
  }

  async findOne(id: string, userId: string): Promise<SavedBlog | null> {
    return this.repo.findOne({ id, userId });
  }

  async saveBlog(blogPostId: string, userId: string): Promise<SavedBlog> {
    // Check if already saved
    const existing = await this.repo.findOne({
      userId,
      blogPostId,
    });

    if (existing) {
      return existing; // Already saved
    }

    // Create new saved blog
    const savedBlog = this.repo.create({
      userId,
      blogPostId,
    });

    await this.em.persistAndFlush(savedBlog);
    return savedBlog;
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const savedBlog = await this.findOne(id, userId);
    if (!savedBlog) {
      return false;
    }

    await this.em.removeAndFlush(savedBlog);
    return true;
  }

  async removeByBlogId(blogPostId: string, userId: string): Promise<boolean> {
    const savedBlog = await this.repo.findOne({
      blogPostId,
      userId,
    });

    if (!savedBlog) {
      return false;
    }

    await this.em.removeAndFlush(savedBlog);
    return true;
  }

  async isBlogSaved(blogPostId: string, userId: string): Promise<boolean> {
    const savedBlog = await this.repo.findOne({
      blogPostId,
      userId,
    });
    return !!savedBlog;
  }
}
