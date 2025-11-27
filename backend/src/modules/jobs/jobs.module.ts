import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Job } from '../../entities/job.entity';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { JobsService } from './jobs.service';

@Module({
  imports: [MikroOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsRepository, JobsService],
  exports: [JobsRepository, JobsService],
})
export class JobsModule {}
