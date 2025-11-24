import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersService } from '@modules/users/users.service';
import { Roless } from '@modules/auth/guards/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { Users } from '@entities/user.entity';
import { UpdateUserDto } from '@modules/users/dtos/user.dto';
import { JobTagsRepository } from '@modules/job-tags/job-tags.repository';
import { JobTag } from '@entities/job-tag.entity';
import { CreateJobTagDto, UpdateJobTagDto } from '@modules/job-tags/dtos/job-tag.dto';
import { RolesService } from '@modules/roles/roles.service';
import { Roles } from '@entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { EmployerProfilesRepository } from '@modules/employer-profile/employer-profiles.repository';
import { EmployerProfile } from '@entities/employer-profile.entity';
import { CreateEmployerProfileDto, UpdateEmployerProfileDto } from '@modules/employer-profile/dtos/employer-profile.dto';
import { JobSkillsRepository } from '@modules/job-skills/job-skills.repository';
import { CreateSkillDto, UpdateSkillDto } from '@modules/job-skills/dtos/skill.dto';
import { CompaniesRepository } from '@modules/company/companies.repository';
import { Company } from '@entities/company.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roless('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
    private readonly JobTagsRepo: JobTagsRepository,
    private readonly rolesService: RolesService,
    private readonly repo: EmployerProfilesRepository,
    private readonly jobSkillRepo: JobSkillsRepository,
    private readonly repoCom: CompaniesRepository
  ) { }

  //Users
  @Get('users')
  async findAllUser(): Promise<ApiResponse<Users[]>> {
    const users = await this.usersService.getAllUsers();
    return {
      status: 'success',
      message: 'Successfully retrieved all users',
      data: users,
      meta: { count: users.length },
    };
  }

  @Get('user/:id')
  async findOneUser(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<Partial<Users>>> {
    const user = await this.usersService.getUserById(id);
    return {
      status: 'success',
      message: 'Successfully retrieved user',
      data: user,
    };
  }

  @Put('user/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateUserDto
  ): Promise<ApiResponse<Users>> {
    const user = await this.usersService.update(id, dto);
    return {
      status: 'success',
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete('user/:id')
  async removeUser(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<boolean>> {
    await this.usersService.delete(id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: true,
    };
  }

  // Job_Tag
  @Get('job-tags')
  async findAllJobTag(): Promise<ApiResponse<JobTag[]>> {
    const jobTags = await this.JobTagsRepo.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all job tags',
      data: jobTags,
      meta: { count: jobTags.length },
    };
  }

  @Get('job-tags/:id')
  async findOneJobTag(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<JobTag>> {
    const jobTag = await this.JobTagsRepo.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved job tag with ID ${id}`,
      data: jobTag,
    };
  }

  @Post('job-tags')
  async createJobTag(
    @Body(ValidationPipe) createJobTagDto: CreateJobTagDto
  ): Promise<ApiResponse<any>> {
    const jobTag = await this.JobTagsRepo.create(createJobTagDto);
    return {
      status: 'success',
      message: 'Job tag created successfully',
      data: jobTag,
    };
  }

  @Put('job-tags')
  async updateJobTag(
    @Body(ValidationPipe) updateJobTagDto: UpdateJobTagDto
  ): Promise<ApiResponse<any>> {
    const jobTag = await this.JobTagsRepo.update(updateJobTagDto);
    return {
      status: 'success',
      message: `Job tag with ID ${updateJobTagDto.id} updated successfully`,
      data: jobTag,
    };
  }
  @Delete('job-tags/:id')
  async deleteJobTag(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.JobTagsRepo.delete(id);
    return {
      status: 'success',
      message: `Job tag with ID ${id} deleted successfully`,
      data: null,
    };
  }

  //Roles
  @Get('roles')
  async findAllRoles(): Promise<ApiResponse<Roles[]>> {
    const data = await this.rolesService.getAllRoles();
    return {
      status: 'success',
      message: 'All roles retrieved successfully',
      data,
      meta: { count: data.length },
    };
  }

  @Get('roles/:id')
  async getOneRoles(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<Roles>> {
    const data = await this.rolesService.findOne(id);
    return {
      status: 'success',
      message: 'Role retrieved successfully',
      data,
    };
  }

  @Get('roles/name/:roleName')
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

  @Post('roles')
  async createRole(@Body() dto: CreateRoleDto): Promise<ApiResponse<Roles>> {
    const data = await this.rolesService.createRole(dto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data,
    };
  }

  @Put('roles/:id')
  async updateRole(
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

  @Delete('roles/:id')
  async removeRole(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<boolean>> {
    await this.rolesService.deleteRole(id);
    return {
      status: 'success',
      message: 'Role deleted successfully',
      data: true,
    };
  }

  //employer- profile
  @Get('employer-profiles')
    async findAllEmployerProfile(): Promise<ApiResponse<EmployerProfile[]>> {
      const data = await this.repo.findAll();
      return {
        status: 'success',
        message: 'All employer profiles',
        data,
        meta: { count: data.length },
      };
  }
  
  @Get('employer-profiles/:id')
  async findOneEmployerProfile(
      @Param('id', ParseUUIDPipe) id: string
    ): Promise<ApiResponse<EmployerProfile>> {
      const data = await this.repo.findOne(id);
      return { status: 'success', message: 'Employer profile found', data };
    }
  
  @Put('employer-profiles/:id')
    async updateEmployerProfile(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) dto: UpdateEmployerProfileDto
    ): Promise<ApiResponse<EmployerProfile>> {
      const data = await this.repo.update(id, dto);
      return { status: 'success', message: 'Employer profile updated', data };
  }
  
  @Delete('employer-profiles/:id')
  async removeEmployerProfile(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return {
      status: 'success',
      message: 'Employer profile deleted',
      data: null,
    };
  }

  //Job_skill
  @Get('skills')
  async findAllJobSkill(): Promise<ApiResponse<any>> {
    const skills = await this.jobSkillRepo.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all skills',
      data: skills,
      meta: { count: skills.length },
    };
  }

  @Get('skills/:id')
  async findOneSkill(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const skill = await this.jobSkillRepo.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved skill with ID ${id}`,
      data: skill,
    };
  }

  @Post('skills')
  async createSkill(
      @Body(ValidationPipe) createSkillDto: CreateSkillDto
    ): Promise<ApiResponse<any>> {
      const skill = await this.jobSkillRepo.create(createSkillDto);
      return {
        status: 'success',
        message: 'Skill created successfully',
        data: skill,
      };
    }
  
  @Put('skills')
  async updateSkill(
      @Body(ValidationPipe) updateSkillDto: UpdateSkillDto
    ): Promise<ApiResponse<any>> {
      const skill = await this.jobSkillRepo.update(updateSkillDto);
      return {
        status: 'success',
        message: `Skill with ID ${updateSkillDto.id} updated successfully`,
        data: skill,
      };
  }
  @Delete('skills/:id')
  async deleteSkill(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.jobSkillRepo.delete(id);
    return {
      status: 'success',
      message: `Skill with ID ${id} deleted successfully`,
      data: null,
    };
  }
  
  //Company 
  @Get('companies')
    async findAllCom(): Promise<ApiResponse<Company[]>> {
      const data = await this.repoCom.findAll();
      return {
        status: 'success',
        message: 'All companies',
        data,
        meta: { count: data.length },
      };
  }
  @Get('companies/:id')
  async findOneCom(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Company>> {
    const data = await this.repoCom.findOne(id);
    return { status: 'success', message: 'Company found', data };
  }

  @Delete('companies/:id')
  async removeCom(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return { status: 'success', message: 'Company deleted', data: null };
  }
}
