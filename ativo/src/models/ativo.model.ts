import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(model: Partial<Ativo>) {
    Object.assign(this, model);
  }
}
