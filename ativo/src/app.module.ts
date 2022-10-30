import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './envValidation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AtivoModule } from './modulos/ativos/ativo.module';
import { ManutencaoModule } from './modulos/manutencao/manutencao.module';
import { Ativo } from './models/ativo.model';
import { Agendamento } from './models/agendamento.model';
import { Manutencao } from './models/manutencao.model';
import { UnidadeMineradora } from './models/unidade-mineradora.model';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AcessoService',
        transport: Transport.GRPC,
        options: {
          url: 'acesso:50051',
          package: 'acesso',
          protoPath: join(process.cwd(), './src/auth.proto'),
        },
      },
    ]),
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
        Ativo, Agendamento, Manutencao, UnidadeMineradora
      ],
      synchronize: true,
      logging: true,
    }),
    AtivoModule,
    ManutencaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
