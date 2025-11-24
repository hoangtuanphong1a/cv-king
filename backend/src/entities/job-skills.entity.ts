import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
@Entity({ tableName: 'JobSkills' })
export class JobSkills extends AuditableEntity {
  @Property({ type: 'string' })
  jobId: string;
  @Property({ type: 'string' })
  skillId: string;
}
