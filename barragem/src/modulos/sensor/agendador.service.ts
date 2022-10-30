import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from 'src/models/sensor.model';
import { TipoSensor } from 'src/models/tipo-sensor.model';
import { readFile } from 'fs';
import { join } from 'path';


function lerArquivo(caminhoArquivo) {
  console.log(caminhoArquivo, 1);
  
  return new Promise((resolve, reject) => {
      console.log(caminhoArquivo, 3);
      
      readFile(caminhoArquivo, (err, data) /* callback */ => {
          console.log(caminhoArquivo, 4, err ? 'Erro' : 'Sucesso');
          err ? reject(err) : resolve(data);
      });
  });
  }
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
    const sensorMockedValues = await lerArquivo(join(process.cwd(), './sensor-mock.txt'));
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
