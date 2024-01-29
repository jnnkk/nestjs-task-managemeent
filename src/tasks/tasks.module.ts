import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Repository를 사용하기 위해 import
    AuthModule, // AuthModule을 import한다.
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
