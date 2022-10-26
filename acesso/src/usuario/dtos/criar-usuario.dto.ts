import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CriarUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O login é obrigatório' })
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password é obrigatória' })
  password: string;
}
