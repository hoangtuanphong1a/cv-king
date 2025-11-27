import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Company } from './company.entity';
import { Users } from './user.entity';
import { JobCategory } from './job-category.entity';
import { JobApplication } from './job-application.entity';
import { SavedJob } from './saved-job.entity';
import { JobSkills } from './job-skills.entity';
import { JobTag } from './job-tag.entity';
import { JobJobTags } from './job-job-tags.entity';

export enum JobStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  EXPIRED = 'Expired',
  CLOSED = 'Closed',
}

@Entity({ tableName: 'Jobs' })
export class Job extends AuditableEntity {
  @Property({ type: 'string' })
  CompanyId: string;

  @Property({ type: 'string', nullable: true })
  PostedByUserId?: string;

  @Property({ type: 'string', length: 500, nullable: false })
  Title: string;

  @Property({ type: 'string', length: 500, nullable: false, unique: true })
  Slug: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  ShortDescription?: string;

  @Property({ columnType: 'text', nullable: true })
  Description?: string;

  @Property({ columnType: 'text', nullable: true })
  Requirements?: string;

  @Property({ columnType: 'text', nullable: true })
  Benefits?: string;

  @Property({ type: 'int', nullable: true })
  SalaryMin?: number;

  @Property({ type: 'int', nullable: true })
  SalaryMax?: number;

  @Property({ type: 'varchar', length: 10, nullable: true })
  Currency?: string;

  @Property({ type: 'varchar', length: 50, nullable: true })
  JobType?: string;

  @Property({ type: 'varchar', length: 300, nullable: true })
  Location?: string;

  @Property({ type: 'int', nullable: true })
  CategoryId?: number;

  @Property({
    type: 'varchar',
    length: 50,
    nullable: false,
    default: 'Active',
  })
  Status: string = JobStatus.ACTIVE;

  @Property({ type: 'int', nullable: false, default: 0 })
  ViewsCount: number = 0;

  @Property({
    type: 'datetime',
    nullable: false,
    onCreate: () => new Date(),
  })
  PostedAt: Date = new Date();

  @Property({ type: 'datetime', nullable: true })
  ExpiresAt?: Date;

  // Relationships
  @ManyToOne(() => Company, { fieldName: 'CompanyId' })
  company!: Company;

  @ManyToOne(() => Users, { fieldName: 'PostedByUserId', nullable: true })
  postedByUser?: Users;

  @ManyToOne(() => JobCategory, { fieldName: 'CategoryId', nullable: true })
  category?: JobCategory;

  // TODO: Add relationships back after fixing related entities
  // @OneToMany(() => JobApplication, application => application.job)
  // applications = new Collection<JobApplication>(this);

  // @OneToMany(() => SavedJob, savedJob => savedJob.job)
  // savedByUsers = new Collection<SavedJob>(this);

  @OneToMany(() => JobSkills, jobSkill => jobSkill.job)
  jobSkills = new Collection<JobSkills>(this);

  @OneToMany(() => JobJobTags, jobJobTag => jobJobTag.job)
  jobJobTags = new Collection<JobJobTags>(this);
}
