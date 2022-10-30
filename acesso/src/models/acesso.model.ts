import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.model';
import TipoAcesso from './tipo-acesso.enum';

@Entity()
@Unique(['username'])
export class Acesso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'enum',
    enum: TipoAcesso,
    default: TipoAcesso.Manutencao,
  })
  tipo: TipoAcesso;

  @OneToOne(() => Usuario, (usuario) => usuario.acesso)
  @JoinColumn()
  usuario: Usuario;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  constructor(user: Partial<Acesso>) {
    Object.assign(this, user);
  }
}
