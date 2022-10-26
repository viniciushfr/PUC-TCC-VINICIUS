import { Module } from '@nestjs/common';
import { TipoSensorService } from './tipo-sensor.service';
import { TipoSensorController } from './tipo-sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSensor } from 'src/models/tipo-sensor.model';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSensor])],
  providers: [TipoSensorService],
  exports: [TipoSensorService],
  controllers: [TipoSensorController],
})
export class TipoSensorModule {}
