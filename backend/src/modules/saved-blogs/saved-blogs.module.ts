import { Module } from '@nestjs/common';
import { SavedBlogsController } from './saved-blogs.controller';
import { SavedBlogsService } from './saved-blogs.service';
import { SavedBlogsRepository } from './saved-blogs.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  controllers: [SavedBlogsController],
  providers: [SavedBlogsService, SavedBlogsRepository],
  exports: [SavedBlogsService],
})
export class SavedBlogsModule {}
