import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ativo } from './ativo.model';
import { Manutencao } from './manutencao.model';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @ManyToOne(() => Ativo, (ativo) => ativo.agendamentos)
  @JoinColumn()
  ativo: Ativo;

  @OneToOne(() => Manutencao, (manutencao) => manutencao.agendamento)
  manutencao: Manutencao;

  constructor(model: Partial<Agendamento>) {
    Object.assign(this, model);
  }
}
