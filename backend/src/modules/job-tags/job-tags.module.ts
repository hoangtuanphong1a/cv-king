import { Module } from '@nestjs/common';
import { JobTagsController } from './job-tags.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobTagsRepository } from './job-tags.repository';
import { JobTag } from '@entities/job-tag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([JobTag])],
  providers: [JobTagsRepository],
  controllers: [JobTagsController],
  exports: [JobTagsRepository]
})
export class JobTagsModule { }
