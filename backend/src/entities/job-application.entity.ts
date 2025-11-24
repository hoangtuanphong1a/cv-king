import { Entity, Enum, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

export enum ApplicationStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  HIRED = 'Hired',
}

@Entity({ tableName: 'job_applications' })
export class JobApplication extends AuditableEntity {
  @Property({ type: 'string' })
  jobId: string;

  @Property({ type: 'string' })
  jobSeekerId: string;

  @Property({ type: 'text', nullable: true })
  coverLetter?: string;

  @Enum(() => ApplicationStatus)
  status: ApplicationStatus = ApplicationStatus.PENDING;

  @Property()
  appliedAt: Date = new Date();

  @Property()
  isDeleted: boolean = false;
}
