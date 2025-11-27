import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCategory } from '../../entities/blog-category.entity';
import { CreateBlogCategoryDto } from './dto/blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/blog-category.dto';

@Injectable()
export class BlogCategoriesRepository {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly repo: EntityRepository<BlogCategory>,
    private readonly em: EntityManager
  ) {}

  async findAll(): Promise<BlogCategory[]> {
    return this.repo.findAll({ orderBy: { createdAt: -1 } });
  }

  async findOne(id: string): Promise<BlogCategory | null> {
    return this.repo.findOne({ id });
  }

  async create(createDto: CreateBlogCategoryDto): Promise<BlogCategory> {
    const category = this.repo.create({ name: createDto.Name });
    await this.em.persistAndFlush(category);
    return category;
  }

  async update(updateDto: UpdateBlogCategoryDto): Promise<BlogCategory> {
    const category = await this.findOne(updateDto.id);
    if (!category) {
      throw new NotFoundException('Blog category not found');
    }

    this.repo.assign(category, { name: updateDto.Name });
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
