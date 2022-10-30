import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';

@Module({
  imports: [],
  providers: [AlertaService],
  exports: [AlertaService],
  controllers: [AlertaController],
})
export class AlertaModule {}
