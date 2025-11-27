import { EntityRepository, EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AuditableEntity } from '../../entities/base/auditable_entity';

@Injectable()
export class BaseRepository<T extends AuditableEntity> {
  constructor(
    protected readonly em: EntityManager,
    protected readonly entityClass: new () => T
  ) {}

  /**
   * Find all entities with optional filtering and pagination
   */
  async findAll(options?: {
    where?: FilterQuery<T>;
    limit?: number;
    offset?: number;
    orderBy?: FindOptions<T>['orderBy'];
  }): Promise<T[]> {
    const { where, limit, offset, orderBy } = options || {};

    return this.em.find(this.entityClass, where || {}, {
      limit,
      offset,
      orderBy,
    });
  }

  /**
   * Find entities with pagination and total count
   */
  async findWithPagination(options: {
    where?: FilterQuery<T>;
    limit?: number;
    offset?: number;
    orderBy?: FindOptions<T>['orderBy'];
  }): Promise<{ data: T[]; total: number }> {
    const { where, limit, offset, orderBy } = options;

    const [data, total] = await this.em.findAndCount(this.entityClass, where || {}, {
      limit,
      offset,
      orderBy,
    });

    return { data, total };
  }

  /**
   * Find one entity by ID
   */
  async findOne(id: string): Promise<T | null> {
    return this.em.findOne(this.entityClass, { id } as FilterQuery<T>);
  }

  /**
   * Find one entity by criteria
   */
  async findOneBy(where: FilterQuery<T>): Promise<T | null> {
    return this.em.findOne(this.entityClass, where);
  }

  /**
   * Find one entity or fail if not found
   */
  async findOneOrFail(id: string): Promise<T> {
    return this.em.findOneOrFail(this.entityClass, { id } as FilterQuery<T>);
  }

  /**
   * Create a new entity
   */
  async create(data: any): Promise<T> {
    const entity = this.em.create(this.entityClass, data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  /**
   * Update an existing entity
   */
  async update(id: string, data: any): Promise<T> {
    const entity = await this.findOneOrFail(id);
    this.em.assign(entity, data);
    await this.em.flush();
    return entity;
  }

  /**
   * Update entities matching criteria
   */
  async updateWhere(where: FilterQuery<T>, data: Partial<T>): Promise<number> {
    return this.em.nativeUpdate(this.entityClass, where, data);
  }

  /**
   * Delete an entity by ID
   */
  async delete(id: string): Promise<boolean> {
    const entity = await this.findOne(id);
    if (!entity) return false;

    await this.em.removeAndFlush(entity);
    return true;
  }

  /**
   * Delete entities matching criteria
   */
  async deleteWhere(where: FilterQuery<T>): Promise<number> {
    return this.em.nativeDelete(this.entityClass, where);
  }

  /**
   * Check if entity exists
   */
  async exists(where: FilterQuery<T>): Promise<boolean> {
    const count = await this.em.count(this.entityClass, where);
    return count > 0;
  }

  /**
   * Count entities matching criteria
   */
  async count(where?: FilterQuery<T>): Promise<number> {
    return this.em.count(this.entityClass, where || {});
  }

  /**
   * Get entity manager for advanced operations
   */
  getEntityManager(): EntityManager {
    return this.em;
  }
}
