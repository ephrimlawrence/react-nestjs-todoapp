import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Groceries shopping',
  })
  @IsNotEmpty()
  @IsString()
  @Min(1)
  title: string;

  @ApiProperty({
    description: 'The body of the todo item',
    example: 'Buy groceries at 5pm today',
  })
  @IsNotEmpty()
  @IsString()
  @Min(1)
  body: string;
}
