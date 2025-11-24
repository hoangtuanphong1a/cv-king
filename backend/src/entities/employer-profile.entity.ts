import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
@Entity({ tableName: 'EmployerProfiles' })
export class EmployerProfile extends AuditableEntity {
  @Property({ length: 200, nullable: true })
  userId!: string;

  @Property({ length: 200, nullable: true })
  company!: string;

  @Property({ length: 200, nullable: true })
  title?: string;

  @Property({ length: 50, nullable: true })
  phone?: string;
}
