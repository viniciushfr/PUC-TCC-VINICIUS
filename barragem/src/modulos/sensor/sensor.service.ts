import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from 'src/models/sensor.model';
import { Repository } from 'typeorm';
import { CadastrarSensorDto } from './dtos/cadastrar-sensor.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  async cadastrar(dto: CadastrarSensorDto) {
    const model = new Sensor(dto);

    return await this.sensorRepository.save(model);
  }
}
