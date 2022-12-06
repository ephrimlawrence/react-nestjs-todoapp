import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret.__v;
      delete ret._id;
    },
  },
})
export class Note {
  @Prop({ trim: true, unique: true })
  title: string;

  @Prop({ trim: true })
  body: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
