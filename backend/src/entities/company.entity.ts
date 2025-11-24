import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Companies' })
export class Company extends AuditableEntity {

  @Property({ type: 'nvarchar' })
  name!: string;

  @Property({ length: 300, nullable: true, type: 'nvarchar' })
  slug?: string;

  @Property({ length: 1000, nullable: true })
  logoUrl?: string;

  @Property({ length: 1000, nullable: true })
  bannerUrl?: string;

  @Property({ length: 200, nullable: true })
  industry?: string;

  @Property({ length: 50, nullable: true })
  companySize?: string;

  @Property({ length: 500, nullable: true })
  website?: string;

  @Property({ length: 300, nullable: true, type: 'nvarchar' })
  location?: string;

  @Property({ type: 'nvarchar', nullable: true })
  description?: string;

  @Property({ type: 'json', nullable: true })
  benefits?: string[];

  @Property({ default: false })
  isVerified: boolean = false;

}
