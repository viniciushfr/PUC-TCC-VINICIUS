import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manutencao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  constructor(model: Partial<Manutencao>) {
    Object.assign(this, model);
  }
}
