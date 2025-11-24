import { Module } from '@nestjs/common';
import { BlogViewsController } from './blog-views.controller';
import { BlogViewsService } from './blog-views.service';
import { BlogViewsRepository } from './blog-views.repository';

@Module({
  controllers: [BlogViewsController],
  providers: [BlogViewsService, BlogViewsRepository],
  exports: [BlogViewsService],
})
export class BlogViewsModule {}
