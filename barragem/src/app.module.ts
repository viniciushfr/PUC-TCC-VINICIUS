import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarragemModule } from './modulos/barragem/barragem.module';
import { envValidation } from './envValidation';
import { SensorModule } from './modulos/sensor/sensor.module';
import { TipoSensorModule } from './modulos/tipoSensor/tipo-sensor.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Sensor } from './models/sensor.model';
import { TipoSensor } from './models/tipo-sensor.model';
import { Barragem } from './models/barragem.model';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: 'default',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        Sensor, TipoSensor, Barragem
      ],
      synchronize: true,
      logging: true,
    }),
    BarragemModule,
    SensorModule,
    TipoSensorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
