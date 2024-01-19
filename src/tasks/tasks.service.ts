import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return Task.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await Task.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return Task.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await Task.delete(id);

        console.log(result);

        if (!result.affected) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;
        await task.save();

        return task;
    }
}
