import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoResponseDto, UpdateTodoDto } from './todos.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('api/todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @ApiOperation({
    operationId: 'Create Todo',
    description: 'Add new todo item',
  })
  @ApiCreatedResponse({
    type: TodoResponseDto,
    description: 'Details of the newly created todo',
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.service.create(createTodoDto);
  }

  @ApiOperation({
    operationId: 'All Todos',
    description: 'Fetch all todo items',
  })
  @ApiOkResponse({
    type: TodoResponseDto,
    isArray: true,
    description: 'Details of all created todo items',
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    operationId: 'Find By Id',
    description: 'Fetch information of a todo item',
  })
  @ApiOkResponse({
    type: TodoResponseDto,
    description: 'Details of the todo item',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    operationId: 'Update Todo',
    description: 'Update a todo item',
  })
  @ApiOkResponse({
    type: TodoResponseDto,
    description: 'Updated details of the todo item',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.service.update(id, updateTodoDto);
  }

  @ApiOperation({
    operationId: 'Delete Todo',
    description: 'Delete a todo item',
  })
  @ApiOkResponse({
    type: TodoResponseDto,
    description: 'Deleted details of the todo item',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
