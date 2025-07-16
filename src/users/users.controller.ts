import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Endpoint para registrar un nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'Usuario creado correctamente, verificate para iniciar sesión.' };
  }
  // Endpoint para verificar un usuario
  @Post('verify')
  async verify(@Body() verifyUserDto: VerifyUserDto) {
    const isVerified = await this.usersService.verifyUser(verifyUserDto);
      if (!isVerified) {
      throw new BadRequestException('Código de verificación inválido o el usuario no existe.');
    }
    return { message: 'Usuario verificado con éxito.' };
}
}
