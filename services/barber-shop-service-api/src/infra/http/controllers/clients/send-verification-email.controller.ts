import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { EmailService } from "../../../services/node-mailer";
import { JwtService } from "@nestjs/jwt";
import { FetchProfileClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/fetch-client";
import { AuthGuardEmailvalidated } from "../../auth/auth-guard-emailValidated";
import { ConfigService } from "@nestjs/config";
import { Env } from "../../../env";

@Controller('/clients')
@UseGuards(AuthGuardEmailvalidated)
export class SendVerificationEmailController {
    constructor(
        private emailService: EmailService,
        private jwtSevice: JwtService,
        private fetchProfileCient: FetchProfileClientUseCase,
        private configService: ConfigService<Env>
    ) {}

    @Post('/send-verification-email')
    async handle(@Req() req: Request, @Res() res: Response) {


        const {value, isLeft} = await this.fetchProfileCient.execute({
            clientId: req.user.sub
        })

        if(isLeft()) {
            return res.status(value.code).json(value)
        }

        const emailAdress = value.client.email

        const token = this.jwtSevice.sign({
            sub: value.client._id.toValue,
        }, {
            expiresIn: '15m',
            secret: this.configService.get('SECRET_TOKEN_JWT_EMAIL')
        })

        try {
            await this.emailService.sendVericationEmail(emailAdress, token)
            return res.status(200).json({
                message: 'E-mail enviado'
            })
        }
        catch(err) {
            throw err
        }

    }

}