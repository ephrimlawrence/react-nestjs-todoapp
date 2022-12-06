import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Groceries shopping',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'The body of the todo item',
    example: 'Buy groceries at 5pm today',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  body: string;
}

export class UpdateTodoDto extends CreateTodoDto {}

export class TodoResponseDto extends CreateTodoDto {
  @ApiProperty({
    description: 'Unique id of the record',
    example: '638f9115ef73df6d34e3a3b2',
  })
  id: string;

  @ApiProperty({
    description: 'Last date the record was updated in ISO3610 format',
    example: '"2022-12-06T18:59:33.272Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Date the record was created in ISO3610 format',
    example: '"2022-12-06T18:59:33.272Z',
  })
  createdAt: string;
}
