import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Roles } from '@entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: EntityRepository<Roles>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all roles
   * @returns List of all roles
   */
  async findAll(): Promise<any> {
    const results = this.roleRepository.findAll();
    return results ?? [];
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role or null if not found
   */
  findOne(id: string): Promise<Roles | null> {
    return this.roleRepository.findOne({ id });
  }

  /**
   * Find a role by its name
   * @param roleName tên role (ví dụ: 'JobSeeker', 'Employer', 'Admin')
   * @returns Role hoặc null nếu không tìm thấy
   */
  async findByName(roleName: string): Promise<Roles | null> {
    return this.roleRepository.findOne({ roleName });
  }

  /**
   * Create a new role
   * // UUID will be automatically generated in AuditableEntity
   * @param createRoleDto Data to create the role
   * @returns Created role
   */
  async create(dto: CreateRoleDto): Promise<Roles> {
    const role = this.roleRepository.create(dto);
    await this.em.persistAndFlush(role);
    return role;
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role or null if not found
   */
  async update(id: string, dto: UpdateRoleDto): Promise<Roles | null> {
    const role = await this.findOne(id);
    if (!role) return null;
    this.roleRepository.assign(role, dto);
    await this.em.flush();
    return role;
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const role = await this.findOne(id);
    if (!role) return false;
    await this.em.removeAndFlush(role);
    return true;
  }
}
