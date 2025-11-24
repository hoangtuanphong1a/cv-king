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
import {
  CreateSkillDto,
  UpdateSkillDto,
} from '@modules/job-skills/dtos/skill.dto';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { JobSkillsRepository } from './job-skills.repository';

@ApiTags('skills')
@Controller('skills')
export class JobSkillsController {
  constructor(private readonly jobSkillRepo: JobSkillsRepository) { }

  /**
   * Retrieve all skills
   * @returns List of all skills wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    const skills = await this.jobSkillRepo.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all skills',
      data: skills,
      meta: { count: skills.length },
    };
  }

  /**
   * Find a skill by ID
   * @param id ID of the skill
   * @returns Skill wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const skill = await this.jobSkillRepo.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved skill with ID ${id}`,
      data: skill,
    };
  }

  /**
   * Create a new skill
   * @param createSkillDto Data to create the skill
   * @returns Created skill wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createSkillDto: CreateSkillDto
  ): Promise<ApiResponse<any>> {
    const skill = await this.jobSkillRepo.create(createSkillDto);
    return {
      status: 'success',
      message: 'Skill created successfully',
      data: skill,
    };
  }

  /**
   * Update a skill
   * @param updateSkillDto Data to update the skill
   * @returns Updated skill wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateSkillDto: UpdateSkillDto
  ): Promise<ApiResponse<any>> {
    const skill = await this.jobSkillRepo.update(updateSkillDto);
    return {
      status: 'success',
      message: `Skill with ID ${updateSkillDto.id} updated successfully`,
      data: skill,
    };
  }

  /**
   * Delete a skill
   * @param id ID of the skill to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.jobSkillRepo.delete(id);
    return {
      status: 'success',
      message: `Skill with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
