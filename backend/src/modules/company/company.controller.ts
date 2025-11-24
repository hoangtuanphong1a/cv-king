import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CompaniesRepository } from './companies.repository';
import { Company } from '@entities/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dtos/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly repo: CompaniesRepository) {}

  @Get()
  async findAll(): Promise<ApiResponse<Company[]>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All companies',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Company>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Company found', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCompanyDto
  ): Promise<ApiResponse<Company>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Company created', data };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateCompanyDto
  ): Promise<ApiResponse<Company>> {
    const data = await this.repo.update(id, dto);
    return { status: 'success', message: 'Company updated', data };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return { status: 'success', message: 'Company deleted', data: null };
  }
}
