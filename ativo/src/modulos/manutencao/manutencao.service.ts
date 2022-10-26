import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manutencao } from 'src/models/manutencao.model';
import { Repository } from 'typeorm';
import { CadastrarManutencaoDto } from './dtos/cadastrar-manutencao.dto';

@Injectable()
export class ManutencaoService {
  constructor(
    @InjectRepository(Manutencao)
    private manutencaoRepository: Repository<Manutencao>,
  ) {}

  async cadastrar(manutencaoDto: CadastrarManutencaoDto) {
    const model = new Manutencao(manutencaoDto);

    return await this.manutencaoRepository.save(model);
  }
}
