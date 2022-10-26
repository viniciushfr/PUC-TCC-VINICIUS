import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoSensor } from './tipo-sensor.model';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('varchar')
  tipo: TipoSensor;

  constructor(model: Partial<Sensor>) {
    Object.assign(this, model);
  }
}
