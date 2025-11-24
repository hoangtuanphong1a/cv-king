import { Injectable, NotFoundException } from '@nestjs/common';
import { JobSkillsRepository } from './job-skills.repository';
import { CreateSkillDto, UpdateSkillDto } from '@modules/job-skills/dtos/skill.dto';

@Injectable()
export class JobSkillsService {
  constructor(private readonly jobSkillsRepository: JobSkillsRepository) {}

  /**
   * Retrieve all skills
   * @returns List of all skills
   */
  async getAllSkills(): Promise<any> {
    return this.jobSkillsRepository.findAll();
  }

  /**
   * Find a skill by ID
   * @param id ID of the skill
   * @returns Skill
   * @throws NotFoundException if the skill does not exist
   */
  async getSkillById(id: string): Promise<any> {
    const skill = await this.jobSkillsRepository.findOne(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  /**
   * Create a new skill
   * @param createSkillDto Data to create the skill
   * @returns Created skill 
   */
  async createSkill(createSkillDto: CreateSkillDto): Promise<any> {
    return this.jobSkillsRepository.create(createSkillDto);
  }

  /**
   * Update a skill
   * @param updateSkillDto Data to update the skill
   * @returns Updated skill
   * @throws NotFoundException if the skill does not exist
   */
  async updateSkill(updateSkillDto: UpdateSkillDto): Promise<any> {
    const skill = await this.jobSkillsRepository.update(updateSkillDto);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${updateSkillDto.id} not found`);
    }
    return skill;
  }

  /**
   * Delete a skill
   * @param id ID of the skill to delete
   * @throws NotFoundException if the skill does not exist
   */
  async deleteSkill(id: string): Promise<void> {
    const deleted = await this.jobSkillsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }
}
