import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarTipoSensorDto } from './dtos/cadastrar-tipo-sensor.dto';
import { TipoSensorService } from './tipo-sensor.service';

@ApiTags('TipoSensores')
@Controller('tipo-sensor')
export class TipoSensorController {
  constructor(private readonly tipoSensorService: TipoSensorService) {}

  @Post()
  criar(@Body() dto: CadastrarTipoSensorDto) {
    return this.tipoSensorService.cadastrar(dto);
  }
}
