import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UnidadeMineradora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  constructor(model: Partial<UnidadeMineradora>) {
    Object.assign(this, model);
  }
}
