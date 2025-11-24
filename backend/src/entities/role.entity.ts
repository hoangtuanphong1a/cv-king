import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Roles' })
export class Roles extends AuditableEntity {

  @Property({ type: 'string', fieldName: 'role_name' })
  @Unique()
  roleName: string;

  @Property({ type: 'string', nullable: true })
  description: string;
}
