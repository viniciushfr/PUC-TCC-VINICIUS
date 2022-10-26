import { Module } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoController } from './manutencao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manutencao } from 'src/models/manutencao.model';

@Module({
  imports: [TypeOrmModule.forFeature([Manutencao])],
  providers: [ManutencaoService],
  exports: [ManutencaoService],
  controllers: [ManutencaoController],
})
export class ManutencaoModule {}
