import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.status.enum";

// enum 안에 없는 걸 입력하면 에러가 난다.
export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}