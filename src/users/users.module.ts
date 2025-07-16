import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module'; 
@Module({
  imports: [TypeOrmModule.forFeature([User]), // Importamos el módulo TypeOrmModule para manejar la entidad User
    EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportamos el servcio para usarlo en otros modulos
})
export class UsersModule {}
