import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './entities/note.entity';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';

// TODO: add tests
// TODO: create react app
@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private model: Model<NoteDocument>) {}

  async create(dto: CreateNoteDto) {
    const exists = await this.model.findOne({ title: dto.title });
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
      throw new BadRequestException('Invalid note id');
    }

    const item = await this.model.findById(id);
    if (item == null) {
      throw new NotFoundException('Oops! Note cannot be found');
    }

    return item;
  }

  async update(id: string, dto: UpdateNoteDto) {
    const exists = await this.model.findOne({
      title: dto.title,
      _id: { $ne: id },
    });
    if (exists != null) {
      throw new ConflictException(
        'A note with similar title already exists! Not title should be unique',
      );
    }

    const doc = await this.findOne(id);
    doc.title = dto.title;
    doc.body = dto.body;
    doc.updatedAt = new Date();

    await doc.save();

    return doc;
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await item.delete();

    return item;
  }
}
