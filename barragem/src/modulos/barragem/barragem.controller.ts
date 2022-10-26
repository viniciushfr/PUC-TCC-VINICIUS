import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarBarragemDto } from './dtos/cadastrar-barragem.dto';
import { BarragemService } from './barragem.service';

@ApiTags('Manutencoes')
@Controller('manutencao')
export class BarragemController {
  constructor(private readonly manutencaoService: BarragemService) {}

  @Post()
  criar(@Body() dto: CadastrarBarragemDto) {
    return this.manutencaoService.cadastrar(dto);
  }
}
