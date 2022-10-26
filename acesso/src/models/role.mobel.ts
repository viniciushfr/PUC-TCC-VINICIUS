import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum RoleCodigo {
  Engenharia = 'engenharia',
  Manutenção = 'manautencao',
  Consultores = 'consultores',
}

@Entity()
@Unique(['codigo'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleCodigo,
  })
  codigo: RoleCodigo;

  @Column()
  name: string;

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
  }
}
