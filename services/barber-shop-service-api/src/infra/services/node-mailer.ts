import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {

    private transporter  = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arturcastrodossantos.com@gmail.com',
            pass: 'xvjf buyv lehq rahp'
        }
    })

    async sendEmail(to: string, subject: string, text: string) {
        const info = await this.transporter.sendMail({
            from: 'arturcastrodossantos.com@gmail.com',
            to,
            subject,
            text
        })
    }

    async sendVericationEmail(emailAdress: string, token: string) {

        return this.transporter.sendMail({
            from: 'arturcastrodossantos.com@gmail.com',
            to: emailAdress,
            subject: 'Sr.Edgar Barbearia - Confirmação de email',
            text: token
        }) 
    }

    async sendWelcomeEmail(emailAdress: string, subject: string, text: string,) {

        return this.transporter.sendMail({
            from: 'arturcastrodosantos.com@gmail.com',
            to: emailAdress,
            subject,
            text
        })

    }

}