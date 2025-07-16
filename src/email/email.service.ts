import { Injectable } from '@nestjs/common';
import { from } from 'form-data';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter;
    constructor(
        private configService: ConfigService,
    ) {
        // Configurar el transportador de nodemailer
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_APP_PASSWORD'),
            },
        });
    }
    // Método para enviar el correo de verificación
    async sendVerificationEmail(email: string, token: string) {
        // Configurar las opciones del correo
        const mailOptions = {
      from: `"Mi App" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: 'Verifica tu cuenta',
      html: `
        <h1>Verificación de Cuenta</h1>
        <p>Tu código de verificación es:</p>
        <h2><b>${token}</b></h2>
        <p>Por favor, úsalo para activar tu cuenta.</p>
      `,
    };
    // Enviar el correo
    await this.transporter.sendMail(mailOptions)
    }
}
