import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.status.enum";

export class GetTasksFilterDto {
    @IsOptional() // 필수가 아니라는 뜻
    @IsEnum(TaskStatus) // enum 안에 없는 걸 입력하면 에러가 난다.
    status?: TaskStatus;

    @IsOptional()
    @IsString() // 문자열이어야 한다는 뜻
    search?: string;
}