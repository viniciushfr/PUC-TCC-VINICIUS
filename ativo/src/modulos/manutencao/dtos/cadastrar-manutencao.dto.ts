import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarManutencaoDto {
  @ApiProperty()
  @IsNotEmpty()
  descricao: string;
}
