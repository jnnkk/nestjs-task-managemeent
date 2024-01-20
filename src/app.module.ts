import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({ // typeorm config
      type: 'postgres',   // 데이터베이스 종류
      host: 'localhost',  // 데이터베이스 호스트
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, // entities 자동 로드
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
