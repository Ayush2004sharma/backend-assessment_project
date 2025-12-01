// src/tasks/tasks.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto, ownerId: number) {
    const task = this.tasksRepo.create({
      ...dto,
      owner: { id: ownerId } as any,
    });
    return this.tasksRepo.save(task);
  }

  findAll(ownerId: number) {
    return this.tasksRepo.find({
      where: { owner: { id: ownerId } },
    });
  }

  async findOne(id: number, ownerId: number) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.owner.id !== ownerId) {
      throw new ForbiddenException('Not your task');
    }
    return task;
  }

  async update(id: number, ownerId: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id, ownerId);
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number, ownerId: number) {
    const task = await this.findOne(id, ownerId);
    await this.tasksRepo.remove(task);
    return { deleted: true };
  }
}
