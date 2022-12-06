import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo, TodoSchema } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

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
    const body = {
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
    };
    const resp: any = await controller.create(body);

    expect(resp.id).toBeDefined();
    expect(resp.updatedAt).toBeDefined();
    expect(resp.createdAt).toBeDefined();
    expect(resp.title).toEqual(body.title);
    expect(resp.body).toEqual(body.body);
  });

  it('create todo with existing title', async () => {
    const body = {
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
    };
    const resp: any = await controller.create(body);
    expect(resp.id).toBeDefined();

    try {
      await controller.create(body);
    } catch (error) {
      expect(error.message).toBe(
        'A todo with similar title already exists! Not title should be unique',
      );
    }
  });

  it('should deleted a todo item', async () => {
    const body = {
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
    };
    const resp: any = await controller.create(body);

    const deleted: any = await controller.remove(resp.id.toString());
    expect(deleted.id).toBeDefined();

    try {
      await controller.findOne(resp.id.toString());
    } catch (error) {
      expect(error.message).toBe('Oops! Todo item cannot be found');
    }
  });

  it('should update a todo item', async () => {
    const body = {
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
    };
    const resp: any = await controller.create(body);
    expect(resp.id).toBeDefined();

    const body2 = { title: body.title, body: faker.lorem.paragraphs() };
    const updated: any = await controller.update(resp.id.toString(), body2);
    expect(updated.id).toBeDefined();
    expect(updated.updatedAt).toBeDefined();
    expect(updated.createdAt).toBeDefined();
    expect(updated.title).toEqual(body2.title);
    expect(updated.body).toEqual(body2.body);
  });
});
