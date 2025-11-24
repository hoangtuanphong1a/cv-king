import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ abstract: true })
export abstract class AuditableEntity {
  @PrimaryKey({ type: 'string' })
  id: string = uuidv4();

  @Property({ type: 'date', fieldName: 'created_at', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: 'date', fieldName: 'updated_at', onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

}
