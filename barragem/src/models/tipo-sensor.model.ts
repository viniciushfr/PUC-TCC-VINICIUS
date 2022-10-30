import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sensor } from './sensor.model';

@Entity()
export class TipoSensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: '' })
  leituraNormal: string;

  @Column({ default: '' })
  leituraAlerta: string;

  @Column({ default: '' })
  leituraPerigo: string;

  @Column()
  unidade: string;

  @OneToMany(() => Sensor, (sensor) => sensor.tipo)
  sensores: Sensor[];

  constructor(model: Partial<TipoSensor>) {
    Object.assign(this, model);
  }
}
