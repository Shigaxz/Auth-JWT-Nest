import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Importamos ConfigModule para acceder a las variables de entorno
  providers: [EmailService],
  exports: [EmailService], // Exportamos el servicio para que pueda ser utilizado en otros módulos
})
export class EmailModule {}
