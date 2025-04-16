import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuardEmailvalidated } from "../../auth/auth-guard-emailValidated";
import { Request, Response } from "express";
import { MarkClientEmailValidatedUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/mark-client-emailValidated";
import { JwtService } from "@nestjs/jwt";
import { AuthGuardMarkEmailvalidated } from "../../auth/auth-guard-mark-emailValidated";

@Controller('/clients')
@UseGuards(AuthGuardMarkEmailvalidated)
export class MarkClientEmailValidatedController {

    constructor(
        private readonly markClientEmailValidatedUseCase: MarkClientEmailValidatedUseCase,
        private jwtService: JwtService
    ) {}

    @Post('/mark-email-validated')
    async handle(@Req() req: Request, @Res() res: Response) {
        const {isLeft, value} = await this.markClientEmailValidatedUseCase.execute({
            id: req.user.sub
        })

        if(isLeft()) {
            return res.status(value.code).json(value)
        }
        return res.json({
            message: 'Seu e-mail foi validado',
            TotalAccessToken: this.jwtService.sign({
                sub: value.client._id.toValue,
                permission: value.client.permission,
                emailValidated: value.client.emailValidated
            }, {
                expiresIn: '10m'
            })
        })
    }
}