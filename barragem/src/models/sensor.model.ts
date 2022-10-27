import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Barragem } from './barragem.model';
import { TipoSensor } from './tipo-sensor.model';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => TipoSensor, (tipoSensor) => tipoSensor.sensores)
  tipo: TipoSensor;

  @ManyToOne(() => Barragem, (barragem) => barragem.sensores)
  barragem: Barragem;

  constructor(model: Partial<Sensor>) {
    Object.assign(this, model);
  }
}
