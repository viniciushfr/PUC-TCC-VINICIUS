import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarSensorDto } from './dtos/cadastrar-sensor.dto';
import { SensorService } from './sensor.service';

@ApiTags('Sensores')
@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post()
  criar(@Body() dto: CadastrarSensorDto) {
    return this.sensorService.cadastrar(dto);
  }
}
