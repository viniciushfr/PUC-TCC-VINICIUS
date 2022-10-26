import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barragem } from 'src/models/barragem.model';
import { Repository } from 'typeorm';
import { CadastrarBarragemDto } from './dtos/cadastrar-barragem.dto';

@Injectable()
export class BarragemService {
  constructor(
    @InjectRepository(Barragem)
    private barragemRepository: Repository<Barragem>,
  ) {}

  async cadastrar(barragemDto: CadastrarBarragemDto) {
    const model = new Barragem(barragemDto);

    return await this.barragemRepository.save(model);
  }
}
