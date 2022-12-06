import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './entities/todo.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
