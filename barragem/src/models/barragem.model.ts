import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sensor } from './sensor.model';

@Entity()
export class Barragem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Sensor, (sensor) => sensor.barragem)
  sensores: Sensor[];

  @Column()
  unidadeMineradora: number;

  constructor(model: Partial<Barragem>) {
    Object.assign(this, model);
  }
}
