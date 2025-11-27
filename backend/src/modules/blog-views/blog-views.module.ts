import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogViews } from '../../entities/blog-views.entity';
import { BlogViewsController } from './blog-views.controller';
import { BlogViewsService } from './blog-views.service';
import { BlogViewsRepository } from './blog-views.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BlogViews])],
  controllers: [BlogViewsController],
  providers: [BlogViewsService, BlogViewsRepository],
  exports: [BlogViewsService],
})
export class BlogViewsModule {}
