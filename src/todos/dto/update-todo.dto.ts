import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from '../todos.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
