import {
  Entity,
  PrimaryKey,
  Property,
  OneToOne,
  Unique,
} from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'JobSeekerProfiles' })
export class JobSeekerProfile extends AuditableEntity {
  @Property({ length: 200, nullable: true })
  @Unique()
  userId!: string;

  @Property({ length: 300, nullable: true })
  fullName?: string;

  @Property({ length: 50, nullable: true })
  phone?: string;

  @Property({ type: 'date', nullable: true })
  dob?: Date;

  @Property({ length: 300, nullable: true })
  location?: string;

  @Property({ type: 'text', nullable: true })
  summary?: string;

  @Property({ length: 200, nullable: true })
  currentTitle?: string;

  @Property({ nullable: true })
  yearsExperience?: number;
}
