import { Entity, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'saved_jobs' })
@Unique({ properties: ['jobSeekerId', 'jobId'] })
export class SavedJob extends AuditableEntity {
  @Property({ type: 'string' })
  jobSeekerId: string;

  @Property({ type: 'string' })
  jobId: string;
}
