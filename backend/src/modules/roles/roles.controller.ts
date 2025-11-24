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
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { Roles } from '@entities/role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  /**
   * Retrieve all roles
   * @returns List of all roles wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<Roles[]>> {
    const data = await this.rolesService.getAllRoles();
    return {
      status: 'success',
      message: 'All roles retrieved successfully',
      data,
      meta: { count: data.length },
    };
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<Roles>> {
    const data = await this.rolesService.findOne(id);
    return {
      status: 'success',
      message: 'Role retrieved successfully',
      data,
    };
  }

  @Get('name/:roleName')
  async getRoleByName(
    @Param('roleName') roleName: string
  ): Promise<ApiResponse<Roles>> {
    // Gọi service
    const data = await this.rolesService.findByName(roleName);
    return {
      status: 'success',
      message: 'Role retrieved successfully',
      data,
    };
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role wrapped in ApiResponse
   */
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<ApiResponse<Roles>> {
    const data = await this.rolesService.createRole(dto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data,
    };
  }
  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role wrapped in ApiResponse
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateRoleDto
  ): Promise<ApiResponse<Roles>> {
    const data = await this.rolesService.updateRole(id, dto);
    return {
      status: 'success',
      message: 'Role updated successfully',
      data: data,
    };
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<boolean>> {
    await this.rolesService.deleteRole(id);
    return {
      status: 'success',
      message: 'Role deleted successfully',
      data: true,
    };
  }
}
