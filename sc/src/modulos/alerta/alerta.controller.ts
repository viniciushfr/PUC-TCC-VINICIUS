import { Controller } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { GrpcMethod } from '@nestjs/microservices';

export type AlertaResposta = {
  status: string;
}

export type Responsaveis = {
  usuarios: number[];
}

@Controller('alerta')
export class AlertaController {
  constructor(private readonly alertaService: AlertaService) {}

  @GrpcMethod()
  iniciarAlerta() {
    return this.alertaService.iniciarAlerta();
  }
  @GrpcMethod()
  notificarResponsaveis(data: Responsaveis) {
    return this.alertaService.notificarResponsaveis(data.usuarios);
  }
}
