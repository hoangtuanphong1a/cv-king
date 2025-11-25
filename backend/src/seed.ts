require('dotenv').config();

import { MikroORM } from '@mikro-orm/core';
import { JobCategory } from './entities/job-category.entity';
import { Skill } from './entities/skill.entity';
import { JobTag } from './entities/job-tag.entity';
import { Company } from './entities/company.entity';
import { Roles } from './entities/role.entity';
import mikroOrmConfig from './config/mikro-orm.config';

const dbConfig = {
  entities: ['dist/**/*.entity.js', 'src/**/*.entity.ts'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: require('@mikro-orm/mssql').MsSqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
};

async function seed() {
  const orm = await MikroORM.init(dbConfig);
  const em = orm.em.fork();

  try {
    // Seed Roles
    const roles = [
      { roleName: 'JobSeeker', description: 'Job seeker user role' },
      { roleName: 'Employer', description: 'Employer user role' },
      { roleName: 'Admin', description: 'Administrator user role' },
    ];

    for (const role of roles) {
      const existing = await em.findOne(Roles, { roleName: role.roleName });
      if (!existing) {
        const newRole = em.create(Roles, role);
        await em.persistAndFlush(newRole);
        console.log(`Created role: ${role.roleName}`);
      }
    }

    // Seed Job Categories
    const jobCategories = [
      { Name: 'Technology' },
      { Name: 'Design' },
      { Name: 'Marketing' },
      { Name: 'Sales' },
      { Name: 'Finance' },
      { Name: 'Human Resources' },
      { Name: 'Operations' },
      { Name: 'Customer Service' },
      { Name: 'Engineering' },
      { Name: 'Product Management' },
    ];

    for (const category of jobCategories) {
      const existing = await em.findOne(JobCategory, { Name: category.Name });
      if (!existing) {
        const newCategory = em.create(JobCategory, category);
        await em.persistAndFlush(newCategory);
        console.log(`Created job category: ${category.Name}`);
      }
    }

    // Seed Skills
    const skills = [
      { Name: 'JavaScript' },
      { Name: 'TypeScript' },
      { Name: 'React' },
      { Name: 'Node.js' },
      { Name: 'Python' },
      { Name: 'Java' },
      { Name: 'C#' },
      { Name: 'PHP' },
      { Name: 'Ruby' },
      { Name: 'Go' },
      { Name: 'Figma' },
      { Name: 'Adobe XD' },
      { Name: 'Photoshop' },
      { Name: 'Illustrator' },
      { Name: 'Digital Marketing' },
      { Name: 'SEO' },
      { Name: 'Content Creation' },
      { Name: 'Sales' },
      { Name: 'CRM' },
      { Name: 'Negotiation' },
    ];

    for (const skill of skills) {
      const existing = await em.findOne(Skill, { Name: skill.Name });
      if (!existing) {
        const newSkill = em.create(Skill, skill);
        await em.persistAndFlush(newSkill);
        console.log(`Created skill: ${skill.Name}`);
      }
    }

    // Seed Job Tags
    const jobTags = [
      { Name: 'Remote' },
      { Name: 'Full-time' },
      { Name: 'Part-time' },
      { Name: 'Contract' },
      { Name: 'Freelance' },
      { Name: 'Entry Level' },
      { Name: 'Mid Level' },
      { Name: 'Senior Level' },
      { Name: 'Tech' },
      { Name: 'Creative' },
      { Name: 'Marketing' },
      { Name: 'Growth' },
      { Name: 'Backend' },
      { Name: 'Frontend' },
      { Name: 'Product' },
      { Name: 'Strategy' },
      { Name: 'B2B' },
      { Name: 'B2C' },
      { Name: 'Startup' },
      { Name: 'Enterprise' },
    ];

    for (const tag of jobTags) {
      const existing = await em.findOne(JobTag, { Name: tag.Name });
      if (!existing) {
        const newTag = em.create(JobTag, tag);
        await em.persistAndFlush(newTag);
        console.log(`Created job tag: ${tag.Name}`);
      }
    }

    // Seed Companies
    const companies = [
      { name: 'TechVision Inc.', slug: 'techvision-inc', industry: 'Technology', companySize: '500-1000 employees', website: 'techvision.com', location: 'San Francisco, CA' },
      { name: 'Creative Studio Pro', slug: 'creative-studio-pro', industry: 'Design & Creative', companySize: '50-100 employees', website: 'creativestudiopro.com', location: 'New York, NY' },
      { name: 'Growth Marketing Co.', slug: 'growth-marketing-co', industry: 'Marketing & Advertising', companySize: '100-500 employees', website: 'growthmarketingco.com', location: 'Los Angeles, CA' },
      { name: 'CloudScale Systems', slug: 'cloudscale-systems', industry: 'Cloud Computing', companySize: '200-500 employees', website: 'cloudscalesystems.com', location: 'Austin, TX' },
      { name: 'InnovateLabs', slug: 'innovatelabs', industry: 'Product Development', companySize: '100-200 employees', website: 'innovatelabs.com', location: 'Seattle, WA' },
      { name: 'Global Sales Partners', slug: 'global-sales-partners', industry: 'Sales & Business Development', companySize: '300-500 employees', website: 'globalsalespartners.com', location: 'Chicago, IL' },
    ];

    for (const company of companies) {
      const existing = await em.findOne(Company, { name: company.name });
      if (!existing) {
        const newCompany = em.create(Company, company);
        await em.persistAndFlush(newCompany);
        console.log(`Created company: ${company.name}`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await orm.close();
  }
}

seed();
