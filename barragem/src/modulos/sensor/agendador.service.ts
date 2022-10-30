import { Injectable, Logger, Inject, } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from 'src/models/sensor.model';
import { TipoSensor } from 'src/models/tipo-sensor.model';
import { readFile } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

interface AlertaService {
  iniciarAlerta(nivel: { nivel: number}): Observable<{
    status: String
  }>;
  notificarResponsaveis(responsaveis: {usuarios: number[]}): Observable<{
    status: String
  }>;
}

function lerArquivo(caminhoArquivo) {
  console.log(caminhoArquivo, 1);
  
  return new Promise((resolve, reject) => {
      console.log(caminhoArquivo, 3);
      
      readFile(caminhoArquivo, (err, data) /* callback */ => {
          err ? reject(err) : resolve(data);
      });
  });
  }
@Injectable()
export class AgendadorService {
  private alertaSvc: AlertaService;

  @Client(
    {
      transport: Transport.GRPC,
      options: {
        url: 'sc:50054',
        package: 'alerta',
        protoPath: join(process.cwd(), './src/alerta.proto'),
      },
    })
  private readonly client: ClientGrpc;

  private readonly logger = new Logger(AgendadorService.name);

  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,

    @InjectRepository(TipoSensor)
    private tipoSensorRepository: Repository<TipoSensor>,
  ) {}

  public onModuleInit(): void {
    this.alertaSvc = this.client.getService<AlertaService>('AlertaService');
  }

  async realizarLeitura(sensor: Sensor): Promise<number> {
    this.logger.log('')
    const sensorMockedValues = await lerArquivo(join(process.cwd(), './src/modulos/sensor/sensor-mock.json'));
    const mocks = JSON.parse(sensorMockedValues as string);
    const leitura = mocks[sensor.tipo.nome];
    const leituraNormal = Number(sensor.tipo.leituraNormal);
    const leituraAlerta = Number(sensor.tipo.leituraAlerta);
    const leituraPerigo = Number(sensor.tipo.leituraPerigo);

    this.logger.log(`Sensor: ${sensor.nome}, Leitura: ${leitura}, Intervalos ${leituraNormal} | ${leituraAlerta} | ${leituraPerigo}`);

    if(leitura >= leituraNormal && leitura <= Number(leituraAlerta)){
      this.logger.log('LEITURA NORMAL');
    } else if(leitura > Number(leituraAlerta) && leitura <= Number(leituraPerigo)){
      this.logger.warn('ALERTAR RESPONSAVEIS');
      this.alertaSvc.notificarResponsaveis({usuarios: [1123,1241,4353]})
    }else if(leitura > leituraPerigo){
      this.logger.warn('ATIVAR SIRENES E EVACUAÇÃO')
      this.alertaSvc.iniciarAlerta({nivel: 1})
    } 


    return 10;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.debug('Realizando leitura dos sensores');

    // busca os sensores configurados
    const sensores = await this.sensorRepository.find({
      relations: ['tipo']
    });

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
