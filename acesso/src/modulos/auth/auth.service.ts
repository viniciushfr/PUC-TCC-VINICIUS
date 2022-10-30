import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Acesso } from 'src/models/acesso.model';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<Partial<Acesso>> {
    const user = await this.usuarioService.authenticate(login, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Acesso) {
    const payload = {
      tipo: user.tipo,
      username: user.username,
      nome: user.usuario.nome,
      sub: user.id,
    };

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
