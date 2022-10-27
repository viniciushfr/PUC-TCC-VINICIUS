import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriarAcessoDto } from './dtos/criar-acesso.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Post()
  async criar(@Body() dto: CriarAcessoDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...usuario } = await this.usuarioService.criar(dto);
    return usuario;
  }
}
