import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogComments } from '../../entities/blog-comment.entity';
import { BlogCommentsController } from './blog-comments.controller';
import { BlogCommentsRepository } from './blog-comments.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      BlogComments,
    ]),
  ],
  controllers: [BlogCommentsController],
  providers: [BlogCommentsRepository],
  exports: [BlogCommentsRepository],
})
export class BlogCommentsModule {}
