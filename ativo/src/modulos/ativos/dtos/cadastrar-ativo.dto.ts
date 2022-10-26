import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarAtivoDto {
  @ApiProperty()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  marca: string;

  @ApiProperty()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty()
  @IsNotEmpty()
  periodoManutencao: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
