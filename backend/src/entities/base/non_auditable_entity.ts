import { Entity, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ abstract: true })
export abstract class NonAuditableEntity {
  @PrimaryKey({ type: 'string' })
  id: string = uuidv4();
}
