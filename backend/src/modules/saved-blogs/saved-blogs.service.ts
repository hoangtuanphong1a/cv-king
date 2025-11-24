import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { SavedBlogsRepository } from './saved-blogs.repository';
import { SavedBlogQueryDto } from './dtos/saved-blog-query.dto';

@Injectable()
export class SavedBlogsService {
  constructor(
    private readonly savedBlogsRepository: SavedBlogsRepository,
    private readonly em: EntityManager
  ) {}

  async saveBlog(blogPostId: string, user: any): Promise<any> {
    // Check if already saved
    const isSaved = await this.savedBlogsRepository.isBlogSaved(blogPostId, user.id);
    if (isSaved) {
      throw new ConflictException('Blog is already saved');
    }

    return await this.savedBlogsRepository.saveBlog(blogPostId, user.id);
  }

  async findAll(
    query: SavedBlogQueryDto,
    user: any
  ): Promise<{ savedBlogs: any[]; total: number }> {
    const result = await this.savedBlogsRepository.findAll(user.id, query);
    return { savedBlogs: result.data, total: result.total };
  }

  async findOne(id: string, user: any): Promise<any> {
    const savedBlog = await this.savedBlogsRepository.findOne(id, user.id);

    if (!savedBlog) {
      throw new NotFoundException('Saved blog not found');
    }

    return savedBlog;
  }

  async remove(id: string, user: any): Promise<void> {
    await this.savedBlogsRepository.remove(id, user.id);
  }

  async removeByBlogId(blogPostId: string, user: any): Promise<void> {
    await this.savedBlogsRepository.removeByBlogId(blogPostId, user.id);
  }

  async isBlogSaved(blogPostId: string, user: any): Promise<boolean> {
    return await this.savedBlogsRepository.isBlogSaved(blogPostId, user.id);
  }
}
