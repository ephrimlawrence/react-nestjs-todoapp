import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.service.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.service.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
