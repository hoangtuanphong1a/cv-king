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
import { UserRolesService } from './user_roles.service';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '@modules/user_roles/dtos/user_role.dto';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@entities/user_role.entity';

@ApiTags('UserRole')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRolesService) {}

  /**
   * Retrieve all userRoles
   */
  @Get()
  async findAll(): Promise<ApiResponse<UserRole[]>> {
    const userRoles = await this.userRoleService.getAllUserRoles();
    return {
      status: 'success',
      message: 'Successfully retrieved all userRoles',
      data: userRoles,
      meta: { count: userRoles.length },
    };
  }

  /**
   * Find a userRole by ID
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<UserRole>> {
    const userRole = await this.userRoleService.getUserRoleById(id);
    return {
      status: 'success',
      message: 'Successfully retrieved userRole',
      data: userRole,
    };
  }

  /**
   * Create a new userRole
   */
  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateUserRoleDto
  ): Promise<ApiResponse<UserRole>> {
    const newUserRole = await this.userRoleService.createUserRole(dto);
    return {
      status: 'success',
      message: 'UserRole created successfully',
      data: newUserRole,
    };
  }

  /**
   * Update a userRole
   */
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateUserRoleDto
  ): Promise<ApiResponse<UserRole>> {
    const updated = await this.userRoleService.update(id, dto);
    return {
      status: 'success',
      message: 'UserRole updated successfully',
      data: updated,
    };
  }

  /**
   * Delete a userRole
   */
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.userRoleService.deleteUserRole(id);
    return {
      status: 'success',
      message: 'UserRole deleted successfully',
      data: null,
    };
  }
}
