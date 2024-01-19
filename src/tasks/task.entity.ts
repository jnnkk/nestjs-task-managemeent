import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";

// Active Record 패턴 : 모델이 데이터베이스와 직접 상호작용 - 권장
// Data Mapper 패턴 : 모델이 데이터베이스와 직접 상호작용하지 않음 - deprecated

@Entity() // 엔티티: 데이터베이스 테이블과 매핑되는 클래스
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') // uuid 자동 생성
    id: string;

    @Column() // 컬럼
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    static getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', 
            { search: `%${search}%` }); // %: 모든 문자열, LIKE : 부분 일치, LOWER : 소문자로 변환
        }

        return query.getMany();
    }

    static async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}