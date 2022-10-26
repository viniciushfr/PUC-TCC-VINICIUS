import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/models/usuario.model';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<Partial<Usuario>> {
    Logger.log('AuthService.validateUser');
    const user = await this.usuarioService.authenticate(login, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    Logger.log('AuthService.login');

    const payload = {
      login: user.login,
      sub: user.id,
    };

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
