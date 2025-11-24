import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Users } from './user.entity';
import { Roles } from './role.entity';
@Entity({ tableName: 'UserRoles' })
export class UserRole extends AuditableEntity {
  @Property({ type: 'string' })
  userId!: string;

  @Property({ type: 'string' })
  roleId!: string;
}
