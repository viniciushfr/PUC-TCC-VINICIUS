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

interface AcessoService {
  validarToken(data: { token: string }): Observable<any>;
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
  getHello(@Headers() headers): Observable<any> {
    Logger.log(headers.authorization);
    const token = headers.authorization.split(' ')[1];

    if (!token) throw new HttpException('Token Ausente', 401);

    return this.acessoSvc.validarToken({
      token: headers.authorization,
    });
  }
}
