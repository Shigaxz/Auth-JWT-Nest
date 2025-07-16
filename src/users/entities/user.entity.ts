import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })// Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  // Estado de la cuenta del usuario
  // Por defecto, las cuentas están inactivas hasta que se verifiquen
  @Column({ default: false })
  isActive: boolean;
  // Token de verificación para la cuenta del usuario
  // Este token se envía al correo electrónico del usuario para verificar su cuenta
  @Column({ nullable: true })
  verificationToken: string;
}