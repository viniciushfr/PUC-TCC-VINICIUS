import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertaModule } from './modulos/alerta/alerta.module';
import { envValidation } from './envValidation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
    }),
    AlertaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
