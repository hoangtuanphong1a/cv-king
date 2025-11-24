import { Module } from '@nestjs/common';
import { JobCategoriesController } from './job-category.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobCategory } from '@entities/job-category.entity';
import { JobCategoriesRepository } from './job-category.repository';

@Module({
  imports: [MikroOrmModule.forFeature([JobCategory])],
  providers: [JobCategoriesRepository],
  controllers: [JobCategoriesController],
})
export class JobCategoryModule {}
