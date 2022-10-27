import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sensor } from './sensor.model';

@Entity()
export class TipoSensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  intervaloNormal: string;

  @Column()
  intervaloAlerta: string;

  @Column()
  intervaloPerigo: string;

  @Column()
  unidade: string;

  @OneToMany(() => Sensor, (sensor) => sensor.tipo)
  sensores: Sensor[];

  constructor(model: Partial<TipoSensor>) {
    Object.assign(this, model);
  }
}
