import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/models/sensor.model';
import { AgendadorService } from './agendador.service';
import { TipoSensor } from 'src/models/tipo-sensor.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sensor, TipoSensor]),
  ],
  providers: [SensorService, AgendadorService],
  exports: [SensorService],
  controllers: [SensorController],
})
export class SensorModule {}
