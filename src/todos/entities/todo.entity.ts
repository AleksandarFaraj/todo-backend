import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/* Create common package. */
export interface TodoEntity extends InMemoryDBEntity {
    
    id: string
    title: string
    description?: string
    todo_type?: string
    status?: boolean
    created_at?: Date
    updated_at?: Date
    due_date?: Date

}

export class Todo implements TodoEntity {
    @ApiProperty()
    id: string
    @ApiProperty()
    title: string
    @ApiProperty()
    description?: string

    @ApiProperty({ enum: ['Default', 'Web', 'Music'] })
    todo_type?: string

    @ApiPropertyOptional()
    created_at?: Date
    @ApiPropertyOptional()
    updated_at?: Date
    @ApiPropertyOptional()
    due_date?: Date
    @ApiProperty()
    status?: boolean
    constructor() {

    }
}
