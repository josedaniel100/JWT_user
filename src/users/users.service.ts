import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordEncriptado = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: passwordEncriptado,
    });
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(nombre_usuario: string): Promise<User> {
    return this.userModel.findOne({ nombre_usuario });
  }

  async login(nombre_usuario: string, password: string) {
    const user = await this.userModel.findOne({ nombre_usuario });
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
      const { nombre, nombre_usuario } = user;
      return { nombre, nombre_usuario };
    }
  }
}
