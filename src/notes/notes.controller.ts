import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, NoteResponseDto, UpdateNoteDto } from './notes.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notes')
@Controller('api/notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @ApiOperation({
    operationId: 'Create Note',
    description: 'Add new note',
  })
  @ApiCreatedResponse({
    type: NoteResponseDto,
    description: 'Details of the newly created note',
  })
  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.service.create(dto).then(resp => resp.toJSON());
  }

  @ApiOperation({
    operationId: 'All Notes',
    description: 'Fetch all notes',
  })
  @ApiOkResponse({
    type: NoteResponseDto,
    isArray: true,
    description: 'Details of all created note',
  })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    operationId: 'Find By Id',
    description: 'Fetch information of a note',
  })
  @ApiOkResponse({
    type: NoteResponseDto,
    description: 'Details of the note',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    operationId: 'Update Note',
    description: 'Update a note',
  })
  @ApiOkResponse({
    type: NoteResponseDto,
    description: 'Updated details of the note',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateNoteDto) {
    return this.service.update(id, updateTodoDto);
  }

  @ApiOperation({
    operationId: 'Delete Note',
    description: 'Delete a note',
  })
  @ApiOkResponse({
    type: NoteResponseDto,
    description: 'Deleted details of the note',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
