import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/usuario.model';
import { Repository } from 'typeorm';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async authenticate(login: string, password: string): Promise<Usuario> {
    console.log('usuario.service.authenticate');
    const user = await this.usuarioRepository.findOne({
      where: { login },
    });

    console.log(user);

    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      throw new HttpException('Login ou senha estão incorretos', 401);
    }

    return user;
  }

  async criar(userDto: CriarUsuarioDto) {
    const user = new Usuario(userDto);
    user.hashPassword();
    return await this.usuarioRepository.save(user);
  }
}
