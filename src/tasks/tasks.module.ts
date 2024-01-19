import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Repository를 사용하기 위해 import
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
