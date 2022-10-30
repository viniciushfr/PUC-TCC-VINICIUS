import {
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface AcessoService {
  validarToken(data: { token: string }): Observable<{
    nome: string;
    tipo: string;
  }>;
}
@Controller()
export class AppController {
  private acessoSvc: AcessoService;

  @Inject('AcessoService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.acessoSvc = this.client.getService<AcessoService>('AcessoService');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Headers() headers) {
    const token = headers.authorization.split(' ')[1];

    const r = await this.acessoSvc.validarToken({
      token,
    }).toPromise();

    console.log(r);

    return `Olá ${r.nome}`;
  }
}
