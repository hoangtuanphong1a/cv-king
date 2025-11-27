import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogTags } from '../../entities/blog-tag.entity';
import { CreateBlogTagDto, UpdateBlogTagDto } from './dto/blog-tag.dto';

@Injectable()
export class BlogTagsRepository {
  constructor(
    @InjectRepository(BlogTags)
    private readonly repo: EntityRepository<BlogTags>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<BlogTags[]> {
    return this.repo.findAll({ orderBy: { createdAt: -1 } });
  }

  async findOne(id: string): Promise<BlogTags | null> {
    return this.repo.findOne({ id });
  }

  async create(createDto: CreateBlogTagDto): Promise<BlogTags> {
    const tag = this.repo.create({ name: createDto.Name });
    await this.em.persistAndFlush(tag);
    return tag;
  }

  async update(updateDto: UpdateBlogTagDto): Promise<BlogTags> {
    const tag = await this.findOne(updateDto.id);
    if (!tag) {
      throw new NotFoundException('Blog tag not found');
    }

    this.repo.assign(tag, { name: updateDto.Name });
    await this.em.flush();
    return tag;
  }

  async delete(id: string): Promise<boolean> {
    const tag = await this.findOne(id);
    if (!tag) {
      return false;
    }

    await this.em.removeAndFlush(tag);
    return true;
  }
}
