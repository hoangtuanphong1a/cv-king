import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogCategory } from '../../entities/blog-category.entity';
import { BlogCategoriesController } from './blog-categories.controller';
import { BlogCategoriesRepository } from './blog-categories.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BlogCategory])],
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesRepository],
})
export class BlogCategoriesModule {}
