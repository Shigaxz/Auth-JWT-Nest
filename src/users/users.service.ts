import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from '../email/email.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService,
  ) {}
  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('El email ya esta registrado.');
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    // Generar un token de verificación de 6 dígitos
    const hashedPassword = await bcrypt.hash(password, 10);
    // Hashear la contraseña
    const newUser = this.usersRepository.create({
      // Crear un nuevo usuario
      email,
      password: hashedPassword,
      verificationToken,
      isActive: false,
      // Por defecto, la cuenta no está activa
    });
    // Guardar el usuario en la base de datos
    const savedUser = await this.usersRepository.save(newUser);
    await this.emailService.sendVerificationEmail(savedUser.email, verificationToken);

    return savedUser;
  }
  // Método para verificar un usuario
  async verifyUser(verifyUserDto: VerifyUserDto): Promise<boolean> {
  const { email, token } = verifyUserDto;
  const user = await this.findOneByEmail(email);
  // Buscar al usuario por email
  if (user && user.verificationToken === token) {
    // Si el token de verificación coincide, activamos la cuenta
    user.isActive = true;
    user.verificationToken = '';
    await this.usersRepository.save(user);
    return true;
  }
  return false;
}
  // Método para encontrar un usuario por email
  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
