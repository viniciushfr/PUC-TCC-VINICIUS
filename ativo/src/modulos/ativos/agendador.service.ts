import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from 'src/models/agendamento.model';
import { Ativo } from 'src/models/ativo.model';
import { MoreThan, Repository } from 'typeorm';
import * as dayjs from 'dayjs'

@Injectable()
export class AgendadorService {
  private readonly logger = new Logger(AgendadorService.name);

  constructor(
    @InjectRepository(Ativo)
    private ativoRepository: Repository<Ativo>,

    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
  ) {}

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.debug('Realizando agendamentos');
    const agora = dayjs();

    // busca os ativos que não possuem agendamentos futuros
    const ativosSemAgendamento = await this.ativoRepository
      .createQueryBuilder("ativo")
      .leftJoinAndSelect("ativo.agendamentos", "agendamento")
      .where(`agendamento.data < '${agora.format('YYYY-MM-DD HH:mm:ss')}' OR agendamento.id IS NULL`)
      .getMany()

    this.logger.log("ATIVOS QUE SERÃO AGENDADOS: ", ativosSemAgendamento.map(ativos => ativos.tipo).join(', '));

    // cria novos agendamentos pros ativos que estão sem
    const novosAgendamentos = ativosSemAgendamento.map(
      (ativo) =>
        new Agendamento({
          data: dayjs(agora).add(ativo.periodoManutecaoMeses, 'month').toDate(),
          ativo: new Ativo({
            id: ativo.id,
          }),
        }),
    );
    // persiste os novos agendamentos
    this.agendamentoRepository.save(novosAgendamentos);
  }
}
