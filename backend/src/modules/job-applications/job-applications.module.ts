import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobApplication } from '../../entities/job-application.entity';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsRepository } from './job-applications.repository';
// import { Users } from '../../entities/user.entity';
import { Job } from '../../entities/job.entity';

@Module({
  imports: [MikroOrmModule.forFeature([JobApplication, Job])],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsRepository],
})
export class JobApplicationsModule {}
