import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogPosts } from '../../entities/blog-post.entity';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsRepository } from './blog-posts.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BlogPosts])],
  controllers: [BlogPostsController],
  providers: [BlogPostsRepository],
})
export class BlogPostsModule {}
