import { Body, Controller, Delete, Get, Next, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDTO : GetTasksFilterDto): Task[] {
        // 필터가 주어지면 필터를 적용해서 반환하고, 필터가 없으면 모든 Task를 반환한다.
        if (Object.keys(filterDTO).length) {
            return this.tasksService.getTasksWithFilter(filterDTO);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    // http://localhost:3000/tasks/1
    @Get(':id')
    getTaskById(@Param('id') id : string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): void {
        this.tasksService.deleteTaskById(id);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = UpdateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
}
