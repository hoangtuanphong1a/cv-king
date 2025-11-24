import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobViewsService } from './job-views.service';
// import { JobView } from '../../entities/job-view.entity';
import { Job } from '../../entities/job.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Job])],
  providers: [JobViewsService],
  exports: [JobViewsService],
})
export class JobViewsModule {}
