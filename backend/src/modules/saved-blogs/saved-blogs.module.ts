import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SavedBlog } from '../../entities/saved-blog.entity';
import { SavedBlogsController } from './saved-blogs.controller';
import { SavedBlogsService } from './saved-blogs.service';
import { SavedBlogsRepository } from './saved-blogs.repository';

@Module({
  imports: [MikroOrmModule.forFeature([SavedBlog])],
  controllers: [SavedBlogsController],
  providers: [SavedBlogsService, SavedBlogsRepository],
  exports: [SavedBlogsService],
})
export class SavedBlogsModule {}
