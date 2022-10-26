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

@Controller()
export class AppController {
  private acessoSvc: any;

  @Inject('AcessoService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.acessoSvc = this.client.getService<any>('AcessoService');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Headers() headers): Promise<string> {
    Logger.log(headers.authorization);
    const token = headers.authorization.split(' ')[1];

    if (!token) throw new HttpException('Token Ausente', 401);

    const user = await this.acessoSvc.ValidarToken({
      token: headers.authorization,
    });

    Logger.log(JSON.stringify(user));

    if (!user) throw new HttpException('Token Invalido', 401);

    return this.appService.getHello();
  }
}
