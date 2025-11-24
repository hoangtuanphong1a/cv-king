import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { NotFoundException } from '@nestjs/common';

describe('JobsController', () => {
  let controller: JobsController;
  let repository: JobsRepository;
  //fix đoạn này
  const mockJob = {
    id: '1',
    CompanyId: '1',
    PostedByUserId: '1',
    Title: 'Test Job',
    Slug: 'test-job',
    Status: 'Active',
    ViewsCount: 0,
    PostedAt: new Date(),
    createdAt: new Date(),
  } as any;

  const mockJobsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findBySlug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsRepository,
          useValue: mockJobsRepository,
        },
      ],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    repository = module.get<JobsRepository>(JobsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto: CreateJobDto = {
        companyId: '1',
        title: 'Software Developer',
        description: 'Great job opportunity',
      };
      const expectedResponse = {
        status: 'success',
        message: 'Job created successfully',
        data: mockJob,
      };

      mockJobsRepository.create.mockResolvedValue(mockJob);

      const result = await controller.create(createJobDto);

      expect(mockJobsRepository.create).toHaveBeenCalledWith(createJobDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAll', () => {
    it('should return a list of jobs', async () => {
      const mockJobs = [mockJob];
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved jobs',
        data: mockJobs,
        meta: { total: mockJobs.length },
      };

      mockJobsRepository.findAll.mockResolvedValue(mockJobs);

      const result = await controller.findAll('key');

      expect(mockJobsRepository.findAll).toHaveBeenCalledWith({ key: 'key' });
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved job',
        data: mockJob,
      };

      mockJobsRepository.findOne.mockResolvedValue(mockJob);

      const result = await controller.findOne('1');

      expect(mockJobsRepository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if job not found', async () => {
      mockJobsRepository.findOne.mockResolvedValue(null);

      await expect(controller.findOne('999')).rejects.toThrow('Job not found');
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const updateJobDto: UpdateJobDto = {
        id: '1',
        title: 'Updated Job Title',
        description: 'Updated description',
      };
      const expectedResponse = {
        status: 'success',
        message: 'Job updated successfully',
        data: mockJob,
      };

      mockJobsRepository.update.mockResolvedValue(mockJob);

      const result = await controller.update(updateJobDto);

      expect(mockJobsRepository.update).toHaveBeenCalledWith(updateJobDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('delete', () => {
    it('should delete a job', async () => {
      const expectedResponse = {
        status: 'success',
        message: 'Job deleted successfully',
        data: null,
      };

      mockJobsRepository.delete.mockResolvedValue(true);

      const result = await controller.delete('1');

      expect(mockJobsRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findBySlug', () => {
    it('should return a job by slug', async () => {
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved job',
        data: mockJob,
      };

      mockJobsRepository.findBySlug.mockResolvedValue(mockJob);

      const result = await controller.findBySlug('test-job');

      expect(mockJobsRepository.findBySlug).toHaveBeenCalledWith('test-job');
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if job not found', async () => {
      mockJobsRepository.findBySlug.mockResolvedValue(null);

      await expect(controller.findBySlug('non-existent')).rejects.toThrow(
        'Job not found'
      );
    });
  });
});
