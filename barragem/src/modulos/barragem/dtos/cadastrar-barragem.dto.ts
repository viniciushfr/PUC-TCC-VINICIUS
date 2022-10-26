import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarBarragemDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;
}
