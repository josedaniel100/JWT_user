import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(
    nombre_usuario: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findOne(nombre_usuario);
    if (!user) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const passwordCorrecto = await bcrypt.compare(password, user.password); // Ahora TypeScript sabe que `password` existe en `user`.
    if (!passwordCorrecto) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user && passwordCorrecto) {
      return user;
    }
    return null;
  }

  async login(nombre_usuario: string, password: string) {
    const user = await this.validarUsuario(nombre_usuario, password);
    if (!user) {
      throw new UnauthorizedException(
        'Tus credenciales son incorrectas o no existen',
      );
    }

    const payload = { nombre_usuario: user.nombre_usuario, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
