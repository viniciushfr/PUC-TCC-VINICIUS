import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AlertaService {
  constructor() {}

  // mock
  async iniciarAlerta() {
    Logger.log('!!!! INICIANDO PROCEDIMENTO DE EVACUAÇÂO !!!!');
    Logger.log('!!!! INICIANDO PROCEDIMENTO DE EVACUAÇÂO !!!!');
    Logger.log('!!!! INICIANDO PROCEDIMENTO DE EVACUAÇÂO !!!!');

    return { status: 'successo' };
  }

  // mock
  async notificarResponsaveis(_usuarios: number[]) {
    Logger.log('INICIANDO NOTIFICAÇÔES E LIGAÇÔES AOS RESPONSAVEIS');
    return { status: 'successo' };
  }
}
