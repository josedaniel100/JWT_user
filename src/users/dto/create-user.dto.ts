import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  edad: number;

  @IsString()
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty()
  @Min(6)
  password: string;
}
