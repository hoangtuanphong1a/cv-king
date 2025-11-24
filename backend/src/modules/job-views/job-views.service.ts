import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
// import { JobView } from '../../entities/job-view.entity';
import { Job, JobStatus } from '../../entities/job.entity';
// import { Users } from '../../entities/user.entity';

@Injectable()
export class JobViewsService {
  constructor(
    //   @InjectRepository(JobView)
    //   private readonly jobViewRepository: EntityRepository<JobView>,
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async trackView(
    jobId: string,
    // user?: Users,
    sessionId?: string
  ): Promise<void> {
    // Use stored procedures instead of ORM relationships
    await this.em.getConnection().execute('EXEC SP_TrackJobView ?, ?, ?', [
      parseInt(jobId),
      // user?.id || null,
      sessionId,
    ]);
  }

  async getJobViews(
    jobId: string
    // user: Users
  ): Promise<{ views: any; total: number }> {
    // Use stored procedure to check permissions and get views
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobViews ?, ?', [
        parseInt(jobId),
        // user.id
      ]);

    return result;
  }

  async getPopularJobs(limit: number = 10): Promise<Job[]> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetPopularJobs ?', [limit]);
    return result;
  }
}
