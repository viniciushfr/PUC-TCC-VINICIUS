import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from 'src/models/agendamento.model';
import { Ativo } from 'src/models/ativo.model';
import { Repository } from 'typeorm';
import { CadastrarAtivoDto } from './dtos/cadastrar-ativo.dto';

@Injectable()
export class AtivoService {
  constructor(
    @InjectRepository(Ativo)
    private ativoRepository: Repository<Ativo>,

    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
  ) {}

  async cadastrar(ativosDto: CadastrarAtivoDto) {
    const model = new Ativo(ativosDto);

    return await this.ativoRepository.save(model);
  }

  async listar() {
    return await this.ativoRepository.find();
  }

  async listarAgendamentos(ativoId: number) {
    return await this.agendamentoRepository
      .createQueryBuilder('a')
      .where('a.ativoId = :ativoId', { ativoId })
      .getMany();
  }
}
