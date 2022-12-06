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
