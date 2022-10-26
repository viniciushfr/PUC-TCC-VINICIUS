import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarTipoSensorDto {
  @ApiProperty()
  @IsNotEmpty()
  intervaloNormal: string;
}
