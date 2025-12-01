// src/tasks/tasks.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  const mockTaskRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepo,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should call repo.create and repo.save', async () => {
    const dto = { title: 'Test', description: 'Desc' };
    const ownerId = 1;

    (repo.create as jest.Mock).mockReturnValue(dto);
    (repo.save as jest.Mock).mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any, ownerId);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, ...dto });
  });
});
