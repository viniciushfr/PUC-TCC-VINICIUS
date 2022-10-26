import { Module } from '@nestjs/common';
import { BarragemService } from './barragem.service';
import { BarragemController } from './barragem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barragem } from 'src/models/barragem.model';

@Module({
  imports: [TypeOrmModule.forFeature([Barragem])],
  providers: [BarragemService],
  exports: [BarragemService],
  controllers: [BarragemController],
})
export class BarragemModule {}
