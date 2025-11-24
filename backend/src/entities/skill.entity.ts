import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Skills' })
export class Skill extends AuditableEntity {
  @Property({ type: 'string', length: 200, nullable: false, unique: true })
  Name: string;
}
