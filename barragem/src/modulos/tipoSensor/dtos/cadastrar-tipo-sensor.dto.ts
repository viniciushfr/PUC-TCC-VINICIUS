import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarTipoSensorDto {
  @ApiProperty()
  @IsNotEmpty()
  intervaloNormal: string;

  @ApiProperty()
  @IsNotEmpty()
  intervaloAlerta: string;

  @ApiProperty()
  @IsNotEmpty()
  intervaloPerigo: string;

  @ApiProperty()
  @IsNotEmpty()
  unidade: string;
}
