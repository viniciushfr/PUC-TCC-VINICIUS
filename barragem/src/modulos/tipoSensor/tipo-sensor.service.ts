import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoSensor } from 'src/models/tipo-sensor.model';
import { Repository } from 'typeorm';
import { CadastrarTipoSensorDto } from './dtos/cadastrar-tipo-sensor.dto';

@Injectable()
export class TipoSensorService {
  constructor(
    @InjectRepository(TipoSensor)
    private sensorRepository: Repository<TipoSensor>,
  ) {}

  async cadastrar(dto: CadastrarTipoSensorDto) {
    const model = new TipoSensor(dto);

    return await this.sensorRepository.save(model);
  }
}
