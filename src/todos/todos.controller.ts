import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Todo, TodoEntity } from './entities/todo.entity';
import { ApiBody, ApiOkResponse, ApiProduces, ApiResponse } from '@nestjs/swagger';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: InMemoryDBService<TodoEntity>) { }
  @Post()
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    createTodoDto.created_at = new Date();
    createTodoDto.updated_at = new Date();
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({ type: [Todo] })
  findAll(): Promise<Todo[]> {
    return this.todosService.getAllAsync().toPromise();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    this.todosService.update(updateTodoDto);
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.deleteAsync(id);
  }
}
