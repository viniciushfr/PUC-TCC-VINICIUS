import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from 'src/models/sensor.model';
import { TipoSensor } from 'src/models/tipo-sensor.model';

@Injectable()
export class AgendadorService {
  private readonly logger = new Logger(AgendadorService.name);

  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,

    @InjectRepository(TipoSensor)
    private tipoSensorRepository: Repository<TipoSensor>,
  ) {}

  async realizarLeitura(_sensor: Sensor): Promise<number> {
    return 10;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.debug('Realizando leitura dos sensores');

    // busca os sensores configurados
    const sensores = await this.sensorRepository.find();

    // busca os parametros dos tipos de sensor
    const tipoSensorParametros = await this.tipoSensorRepository.find();

    // faz um map pra key => value pra acesso rapido dos parametros
    const mapTipoParametro = {};
    tipoSensorParametros.forEach((tipo) => {
      mapTipoParametro[tipo.id] = tipo;
    });

    // percorre os sensores realizando a leitura
    const tasksLerSensor = sensores.map((sensor) =>
      this.realizarLeitura(sensor),
    );

    Promise.all(tasksLerSensor);
  }
}
