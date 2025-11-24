import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { Roles } from '@entities/role.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all roles
   * @returns List of all roles
   */
  async getAllRoles(): Promise<any> {
    return this.rolesRepository.findAll();
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role
   * @throws NotFoundException if the role does not exist
   */
  async findOne(id: string) {
    const role = await this.rolesRepository.findOne(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role
   */
  async createRole(dto: CreateRoleDto): Promise<Roles> {
    return this.rolesRepository.create(dto);
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role
   * @throws NotFoundException if the role does not exist
   */
  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.rolesRepository.update(id, updateRoleDto);
    if (!role) throw new NotFoundException(`Role with ID ${id} not found`);
    return role;
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @throws NotFoundException if the role does not exist
   */
  async deleteRole(id: string): Promise<boolean> {
    const deleted = await this.rolesRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Role with ID ${id} not found`);
    return true;
  }

  /**
   * Find a role by its name (e.g., 'JobSeeker', 'Employer', 'Admin')
   * @param roleName Tên role
   * @returns Role entity
   * @throws NotFoundException nếu không tìm thấy
   */
  async findByName(roleName: string): Promise<Roles> {
    const role = await this.rolesRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role with name "${roleName}" not found`);
    }
    return role;
  }
}
