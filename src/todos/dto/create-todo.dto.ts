import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Todo } from "../entities/todo.entity";

export class CreateTodoDto extends PartialType(Todo) {
    @ApiProperty()
    id: string
    @ApiProperty()
    title: string
}
