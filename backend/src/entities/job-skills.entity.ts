import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { Skill } from './skill.entity';

@Entity({ tableName: 'JobSkills' })
export class JobSkills extends AuditableEntity {
  @Property({ type: 'string' })
  jobId: string;

  @Property({ type: 'string' })
  skillId: string;

  @ManyToOne(() => Job, { fieldName: 'jobId' })
  job!: Job;

  @ManyToOne(() => Skill, { fieldName: 'skillId' })
  skill!: Skill;
}
