import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@entities/user_role.entity';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '@modules/user_roles/dtos/user_role.dto';

@Injectable()
export class UserRolesRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: EntityRepository<UserRole>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all userRoles
   * @returns List of all userRoles
   */
  async findAll(): Promise<any> {
    return true;
  }

  /**
   * Find a userRole by ID
   * @param id ID of the userRole
   * @returns UserRole or null if not found
   */
  findOne(id: string): Promise<UserRole | null> {
    return this.userRoleRepository.findOne({ id });
  }

  findByUser(userId: string): Promise<UserRole[]> {
    return this.userRoleRepository.find({ userId });
  }
  /**
   * Create a new userRole
   * // UUID will be automatically generated in AuditableEntity
   * @param createUserRoleDto Data to create the userRole
   * @returns Created userRole
   */
  async create(dto: CreateUserRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({
      userId: dto.userId,
      roleId: dto.roleId,
    });
    await this.em.persistAndFlush(userRole);
    return userRole;
  }

  /**
   * Update a userRole
   * @param updateUserRoleDto Data to update the userRole
   * @returns Updated userRole or null if not found
   */
  async update(id: string, dto: UpdateUserRoleDto): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne(id);
    if (!userRole) throw new NotFoundException('UserRole not found');

    this.userRoleRepository.assign(userRole, dto);
    await this.em.flush();
    return userRole;
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const userRole = this.findOne(id);
    if (!userRole) return false;
    await this.em.removeAndFlush(userRole);
    return true;
  }
}
