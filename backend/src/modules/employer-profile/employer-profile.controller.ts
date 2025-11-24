import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EmployerProfile } from '@entities/employer-profile.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { EmployerProfilesRepository } from './employer-profiles.repository';
import {
  CreateEmployerProfileDto,
  UpdateEmployerProfileDto,
} from './dtos/employer-profile.dto';
import { Roless } from '@modules/auth/guards/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UpdateEmployerCompanyDto } from './dtos/updateEmployer-Company.dto';


@ApiTags('employer-profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roless('Employer')
@Controller('employer-profiles')
export class EmployerProfilesController {
  constructor(private readonly repo: EmployerProfilesRepository) { }

  @Get()
  async findAll(): Promise<ApiResponse<EmployerProfile[]>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All employer profiles',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Employer profile found', data };
  }

  @Get('by-user/:userId')
  async findByUserId(@Param('userId', ParseUUIDPipe) userId: string):
    Promise<ApiResponse<EmployerProfile>> {
    const profile = await this.repo.findByUserId(userId);
    return {
      status: 'success',
      message: `Employer profile of user ${userId}`,
      data: profile,
    };
  }


  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateEmployerProfileDto
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Employer profile created', data };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateEmployerProfileDto
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.update(id, dto);
    return { status: 'success', message: 'Employer profile updated', data };
  }

  @Put(':id/edit-company')
  async updateEmployerAndCompany(
    @Param('id') id: string,
    @Body() dto: UpdateEmployerCompanyDto
  ) {
    return this.repo.updateEmployerAndCompany(
      id,
      dto.employerProfile,
      dto.company
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return {
      status: 'success',
      message: 'Employer profile deleted',
      data: null,
    };
  }
}
