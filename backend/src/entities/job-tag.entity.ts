import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
@Entity({ tableName: 'JobTags' })
export class JobTag extends AuditableEntity {
  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;
}
