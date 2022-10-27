import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Agendamento } from './agendamento.model';

@Entity()
export class Manutencao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToOne(() => Agendamento, (agendamento) => agendamento.manutencao)
  agendamento: Agendamento;

  @Column()
  responsavel: number; //usuario

  constructor(model: Partial<Manutencao>) {
    Object.assign(this, model);
  }
}
