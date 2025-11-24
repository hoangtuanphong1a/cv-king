import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

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

  @Property({ type: 'string', length: -1, nullable: true })
  Description?: string;

  @Property({ type: 'string', length: -1, nullable: true })
  Requirements?: string;

  @Property({ type: 'string', length: -1, nullable: true })
  Benefits?: string;

  @Property({ type: 'int', nullable: true })
  SalaryMin?: number;

  @Property({ type: 'int', nullable: true })
  SalaryMax?: number;

  @Property({ type: 'nvarchar', length: 10, nullable: true })
  Currency?: string;

  @Property({ type: 'nvarchar', length: 50, nullable: true })
  JobType?: string;

  @Property({ type: 'nvarchar', length: 300, nullable: true })
  Location?: string;

  @Property({ type: 'nvarchar', nullable: true })
  CategoryId?: number;

  @Property({
    type: 'nvarchar',
    length: 50,
    nullable: false,
    default: 'Active',
  })
  Status: string = JobStatus.ACTIVE;

  @Property({ type: 'int', nullable: false, default: 0 })
  ViewsCount: number = 0;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
  })
  PostedAt: Date = new Date();

  @Property({ type: 'datetime2', nullable: true })
  ExpiresAt?: Date;
}
