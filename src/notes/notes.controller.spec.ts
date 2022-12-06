import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Note, NoteSchema } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/notes-app'),
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
      ],
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a note', async () => {
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

  it('create note with existing title', async () => {
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
        'A note with similar title already exists! Not title should be unique',
      );
    }
  });

  it('should deleted a note', async () => {
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
      expect(error.message).toBe('Oops! Note cannot be found');
    }
  });

  it('should update a note', async () => {
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
