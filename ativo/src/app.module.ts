import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './envValidation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AtivoModule } from './modulos/ativos/ativo.module';
import { ManutencaoModule } from './modulos/manutencao/manutencao.module';

@Module({
  imports: [
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
      entities: [],
      synchronize: false,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AcessoService',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:8889',
          package: 'acesso',
          protoPath: join(__dirname, '../src/auth.proto'),
        },
      },
    ]),
    AtivoModule,
    ManutencaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
