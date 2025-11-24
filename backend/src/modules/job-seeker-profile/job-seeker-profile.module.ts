import { JobSeekerProfile } from '@entities/job-seeker-profile.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JobSeekerProfilesController } from './job-seeker-profile.controller';
import { JobSeekerProfilesRepository } from './job-seeker-profiles.repository';

@Module({
  imports: [MikroOrmModule.forFeature([JobSeekerProfile])],
  controllers: [JobSeekerProfilesController],
  providers: [JobSeekerProfilesRepository],
  exports: [JobSeekerProfilesRepository],
})
export class JobSeekerProfileModule {}
