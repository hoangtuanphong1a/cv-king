import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SavedJobsController } from './saved-jobs.controller';
import { SavedJobsService } from './saved-jobs.service';
import { SavedJobsRepository } from './saved-jobs.repository';
import { SavedJob } from '../../entities/saved-job.entity';
import { Job } from '../../entities/job.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SavedJob, Job])],
  controllers: [SavedJobsController],
  providers: [SavedJobsRepository, SavedJobsService],
  exports: [SavedJobsService],
})
export class SavedJobsModule {}
