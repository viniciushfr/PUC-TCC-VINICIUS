import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barragem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  constructor(model: Partial<Barragem>) {
    Object.assign(this, model);
  }
}
