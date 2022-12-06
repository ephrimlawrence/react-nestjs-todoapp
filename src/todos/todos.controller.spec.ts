import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo, TodoSchema } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { faker } from '@faker-js/faker';

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/todos-app'),
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
      ],
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo item', async () => {
    const resp: any = await controller.create({
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
    });

    console.log(resp);
    expect(resp.id).toBeDefined();
  });
});
