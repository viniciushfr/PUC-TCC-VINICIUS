import { Module } from '@nestjs/common';
import { AtivoService } from './ativo.service';
import { AtivoController } from './ativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ativo } from 'src/models/ativo.model';

@Module({
  imports: [TypeOrmModule.forFeature([Ativo])],
  providers: [AtivoService],
  exports: [AtivoService],
  controllers: [AtivoController],
})
export class AtivoModule {}
