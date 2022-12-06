import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';
import { CreateTodoDto } from './todos.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private model: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto) {
    const exists = await this.model.find({ title: dto.title });
    if (exists != null) {
      throw new ConflictException(
        'A note with similar title already exists! Not title should be unique',
      );
    }

    const doc = new this.model();

    doc.title = dto.title;
    doc.body = dto.body;
    doc.updatedAt = new Date();
    doc.createdAt = new Date();

    await doc.save();

    return doc;
  }

  async findAll() {
    return this.model.find();
  }

  async findOne(id: string) {
    if (!isMongoId(id)) {
      throw new BadRequestException('Invalid todo id');
    }

    const item = await this.model.findById(id);
    if (item == null) {
      throw new NotFoundException('Oops! Todo item cannot be found');
    }

    return item;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    // TODO: implement update
    return `This action updates a #${id} todo`;
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await item.delete();

    return item;
  }
}
