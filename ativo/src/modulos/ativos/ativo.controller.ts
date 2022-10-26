import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarAtivoDto } from './dtos/cadastrar-ativo.dto';
import { AtivoService } from './ativo.service';

@ApiTags('Ativos')
@Controller('ativo')
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  criar(@Body() dto: CadastrarAtivoDto) {
    return this.ativoService.cadastrar(dto);
  }
}
