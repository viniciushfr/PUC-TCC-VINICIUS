import {
  Body,
  Controller,
  Post,
  Get,
  Inject,
  Headers,
  HttpException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarAtivoDto } from './dtos/cadastrar-ativo.dto';
import { AtivoService } from './ativo.service';
import { AcessoService } from 'src/app.controller';
import { ClientGrpc } from '@nestjs/microservices';

@ApiTags('Ativos')
@Controller('ativos')
export class AtivoController {
  private acessoSvc: AcessoService;

  @Inject('AcessoService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.acessoSvc = this.client.getService<AcessoService>('AcessoService');
  }

  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  async criar(@Body() dto: CadastrarAtivoDto, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];

    const r = await this.acessoSvc
      .validarToken({
        token,
      })
      .toPromise();

    if (!r || r.tipo !== 'Manutencao') {
      throw new HttpException('Permissão negada', 401);
    }

    return this.ativoService.cadastrar(dto);
  }

  @Get()
  listar() {
    return this.ativoService.listar();
  }

  @Get('/agendamentos/:ativoId')
  listarAgendamentos(@Param('ativoId') ativoId) {
    return this.ativoService.listarAgendamentos(ativoId);
  }
}
