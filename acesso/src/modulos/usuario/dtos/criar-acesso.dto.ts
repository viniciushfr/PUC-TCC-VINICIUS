import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import TipoAcesso from 'src/models/tipo-acesso.enum';

export class CriarAcessoDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  tipo: TipoAcesso;
}
