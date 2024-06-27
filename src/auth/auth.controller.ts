import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('nombre_usuario') nombre_usuario: string,
    @Body('password') password: string,
  ) {
    try {
      return this.authService.login(nombre_usuario, password);
    } catch (error) {
      throw new UnauthorizedException(
        'Tus credenciales son incorrectas o no existen en nuestra base de datos',
      );
    }
  }

  @Get('logout')
  logout() {
    return 'logout exitoso';
  }
}
