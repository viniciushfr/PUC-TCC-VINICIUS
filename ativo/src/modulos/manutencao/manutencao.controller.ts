import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CadastrarManutencaoDto } from './dtos/cadastrar-manutencao.dto';
import { ManutencaoService } from './manutencao.service';

@ApiTags('Manutencoes')
@Controller('manutencao')
export class ManutencaoController {
  constructor(private readonly manutencaoService: ManutencaoService) {}

  @Post()
  criar(@Body() dto: CadastrarManutencaoDto) {
    return this.manutencaoService.cadastrar(dto);
  }
}
