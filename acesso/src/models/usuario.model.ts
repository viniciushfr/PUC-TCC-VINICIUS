import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Acesso } from './acesso.model';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToOne(() => Acesso, (acesso) => acesso.usuario)
  acesso: Acesso;

  constructor(user: Partial<Usuario>) {
    Object.assign(this, user);
  }
}
