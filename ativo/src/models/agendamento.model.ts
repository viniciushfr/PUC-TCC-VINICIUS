import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  constructor(model: Partial<Agendamento>) {
    Object.assign(this, model);
  }
}
