import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'The title of the note',
    example: 'Groceries shopping',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'The body of the note',
    example: 'Buy groceries at 5pm today',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  body: string;
}

export class UpdateNoteDto extends CreateNoteDto {}

export class NoteResponseDto extends CreateNoteDto {
  @ApiProperty({
    description: 'Unique id of the record',
    example: '638f9115ef73df6d34e3a3b2',
  })
  id: string;

  @ApiProperty({
    description: 'Last date the record was updated in ISO3610 format',
    example: '2022-12-06T18:59:33.272Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Date the record was created in ISO3610 format',
    example: '2022-12-06T18:59:33.272Z',
  })
  createdAt: string;
}
