import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ trim: true })
  title: string;

  @Prop({ trim: true })
  body: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
