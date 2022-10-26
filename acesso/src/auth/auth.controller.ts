import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import {
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/models/usuario.model';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUsuarioToken } from './strategies/IUsuarioToken';
type Token = {
  token: string;
};

@ApiTags('Autenticacao')
@Controller('auth')
export class AuthController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    Logger.log('AuthController.login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getProfile(@Request() req) {
    return req.user;
  }

  @GrpcMethod('AcessoService', 'ValidarToken')
  validarToken(data: Token): IUsuarioToken {
    Logger.log('Call VALIDAR TOKEN');
    if (this.jwtService.verify(data.token)) {
      return this.jwtService.decode(data.token, null) as Usuario;
    }
    return null;
  }
}
