import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertaService {
  constructor() {}

  // mock
  async iniciarAlerta() {
    return 'Alertando';
  }
  
  // mock
  async notificarResponsaveis(_usuarios: number[]) {
    return 'Notificar Responsaveis'
  }
}
