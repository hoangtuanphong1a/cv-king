import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
// import { Roles } from '@entities/role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { RolesRepository } from './roles.repository';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    // private readonly rolesService: RolesService
    private readonly rolesRepository: RolesRepository
  ) {}

  /**
   * Retrieve all roles
   * @returns List of all roles wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    const roles = await this.rolesRepository.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all roles',
      data: roles,
      meta: { count: roles.length },
    };
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const role = await this.rolesRepository.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved role with ID ${id}`,
      data: role,
    };
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto
  ): Promise<ApiResponse<any>> {
    const role = await this.rolesRepository.create(createRoleDto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data: role,
    };
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto
  ): Promise<ApiResponse<any>> {
    const role = await this.rolesRepository.update(updateRoleDto);
    return {
      status: 'success',
      message: `Role with ID ${updateRoleDto.id} updated successfully`,
      data: role,
    };
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.rolesRepository.delete(id);
    return {
      status: 'success',
      message: `Role with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
