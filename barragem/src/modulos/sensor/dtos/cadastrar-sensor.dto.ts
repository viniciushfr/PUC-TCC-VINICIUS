import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarSensorDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;
}
