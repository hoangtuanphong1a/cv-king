import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogTags } from '../../entities/blog-tag.entity';
import { BlogTagsController } from './blog-tags.controller';
import { BlogTagsRepository } from './blog-tags.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BlogTags])],
  controllers: [BlogTagsController],
  providers: [BlogTagsRepository],
})
export class BlogTagsModule {}
