import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'JobCategories' })
export class JobCategory extends AuditableEntity {
  @Property({ type: 'string', length: 200, nullable: false, unique: true })
  Name: string;
}
