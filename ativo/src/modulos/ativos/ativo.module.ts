import { Module } from '@nestjs/common';
import { AtivoService } from './ativo.service';
import { AtivoController } from './ativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ativo } from 'src/models/ativo.model';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendadorService } from './agendador.service';
import { Agendamento } from 'src/models/agendamento.model';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ativo, Agendamento]),
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
  ])
  ],
  providers: [AtivoService, AgendadorService],
  exports: [AtivoService, AgendadorService],
  controllers: [AtivoController],
})
export class AtivoModule {}
