import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(model: Partial<TipoSensor>) {
    Object.assign(this, model);
  }
}
