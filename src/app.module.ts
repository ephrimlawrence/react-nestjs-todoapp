import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './notes/notes.module';
import { Note, NoteSchema } from './notes/entities/note.entity';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/notes-app'),
    TodosModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
