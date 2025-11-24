import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dtos/user.dto';
import { Users } from '@entities/user.entity';
import { EntityManager, wrap } from '@mikro-orm/core';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly em: EntityManager
  ) { }

  /**
   * Retrieve all users
   * @returns List of all users
   */
  async getAllUsers(): Promise<any> {
    return this.em.find(Users, {});
  }

  /**
   * Find a user by ID
   * @param id ID of the user
   * @returns User
   * @throws NotFoundException if the user does not exist
   */
  async getUserById(id: string): Promise<any> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
 * Lấy thông tin user đầy đủ cho API "My Profile"
 * Trả về tất cả trường an toàn, ẩn password và refreshToken
 */
  async getSafeUserById(id: string): Promise<Partial<Users>> {
    const user = await this.em.findOne(
      Users,
      { id },
      {
        fields: [
          'id',
          'email',
          'username',
          'displayName',
          'avatarUrl',
          'preferredLocale',
          'isEmailConfirmed',
          'isActive',
          'isDeleted',
          'lastLoginAt',
          'createdAt',
          'updatedAt',
        ],
      },
    );

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // async getUserById(id: string): Promise<Omit<Users, 'password' | 'refreshToken'>> {
  //   const user = await this.usersRepository.findOne(id);
  //   if (!user) throw new NotFoundException(`User with ID ${id} not found`);
  //   const { password, refreshToken, ...safeUser } = user as any;
  //   return safeUser;
  // }
  /**
   * Find a user by email
   * @param email user's email
   * @returns Users | null
   */
  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findByEmail(email);
  }

  /**
   * Create a new user
   * @param createUserDto Data to create the user
   * @returns Created user
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  /**
   * Update a user
   * @param updateUserDto Data to update the user
   * @returns Updated user
   * @throws NotFoundException if the user does not exist
   */
  async update(id: string, data: Partial<Users>): Promise<Users> {
    const updated = await this.usersRepository.update(id, data);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  /**
   * Delete a user
   * @param id ID of the user to delete
   * @throws NotFoundException if the user does not exist
   */
  async delete(id: string): Promise<boolean> {
    const ok = await this.usersRepository.delete(id);
    if (!ok) throw new NotFoundException('User not found');
    return true;
  }
}
