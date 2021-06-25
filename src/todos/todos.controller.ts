import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async findAll(@Query('q') searchQuery: string, @Query('limit') limit: number = 15, @Query('page') page: number): Promise<Todo[]> {
    //very ineffecient limit pagination. SQL or index optimize if bottle neck. Could also do on client side.

    let allResults = await this.todosService.getAllAsync().toPromise();

    if (searchQuery) {

      if (searchQuery === "secret") {
        await this.todosService.createAsync({ created_at: new Date(), updated_at: new Date(), todo_type: "web", title: "Something secret was triggered ;)", "description": "really! works?", "status": false }).toPromise()
        for (var i = 0; i < 65; i++) {

          const randomUtterance = ["Random Todo", "Really random?", "Do you like emojis?", "😁 whats this", "if bottle neck", "Could also do on client side.", "0 * 7 = 0. To: 3*7"]
          const r = (await this.todosService.createAsync({ created_at: new Date(), updated_at: new Date(), todo_type: "web", title: randomUtterance[Math.floor(Math.random() * 100) % randomUtterance.length], "description": "really! works?", "status": false }).toPromise());
        }
        allResults = await this.todosService.getAllAsync().toPromise();
      }
      allResults = allResults.filter(todo => todo.title.toLocaleLowerCase().indexOf(searchQuery) !== -1);
    }
    if (limit !== undefined && page !== undefined) {
      const from = (page - 1) * limit; // 3 * 7 = 21. 0 * 7 = 0. To: 3*7
      const to = (page - 1) * limit + limit;
      allResults = allResults.slice(from, to);
    }
    return allResults
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
