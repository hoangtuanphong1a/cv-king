import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { JobTag } from './job-tag.entity';

@Entity({ tableName: 'JobJobTags' })
export class JobJobTags extends AuditableEntity {
  @ManyToOne(() => Job, { fieldName: 'jobId' })
  job!: Job;

  @ManyToOne(() => JobTag, { fieldName: 'jobTagId' })
  jobTag!: JobTag;
}
