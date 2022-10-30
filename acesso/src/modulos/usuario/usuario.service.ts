import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acesso } from 'src/models/acesso.model';
import { Usuario } from 'src/models/usuario.model';
import { Repository } from 'typeorm';
import { CriarAcessoDto } from './dtos/criar-acesso.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Acesso)
    private acessoRepository: Repository<Acesso>,
  ) {}

  async authenticate(login: string, password: string): Promise<Acesso> {
    console.log('usuario.service.authenticate');
    const user = await this.acessoRepository.findOne({
      where: { username: login },
      relations: ['usuario'],
    });

    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      throw new HttpException('Login ou senha estão incorretos', 401);
    }

    return user;
  }

  async criar(userDto: CriarAcessoDto) {
    const acesso = new Acesso({
      username: userDto.username,
      password: userDto.password,
    });

    acesso.usuario = new Usuario({
      nome: userDto.nome,
    });

    acesso.hashPassword();

    return await this.acessoRepository.save(acesso);
  }
}
