import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamento } from './agendamento.model';
import { UnidadeMineradora } from './unidade-mineradora.model';

@Entity()
export class Ativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  periodoManutecaoMeses: number;

  @Column()
  status: string;

  @ManyToOne(
    () => UnidadeMineradora,
    (unidadeMineradora) => unidadeMineradora.ativos,
  )
  unidadeMineradora: UnidadeMineradora;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.ativo)
  agendamentos: Agendamento[];

  constructor(model: Partial<Ativo>) {
    Object.assign(this, model);
  }
}
