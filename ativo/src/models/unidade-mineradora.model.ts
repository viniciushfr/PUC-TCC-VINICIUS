import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ativo } from './ativo.model';

@Entity()
export class UnidadeMineradora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  @OneToMany(() => Ativo, (ativo) => ativo.unidadeMineradora)
  ativos: Ativo[];

  constructor(model: Partial<UnidadeMineradora>) {
    Object.assign(this, model);
  }
}
