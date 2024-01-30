import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return Task.getTasks(filterDto, user);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await Task.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return Task.createTask(createTaskDto, user);
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
