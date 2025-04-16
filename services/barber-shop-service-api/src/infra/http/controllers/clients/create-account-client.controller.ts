import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";
import { CreateClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/create-client-use-case";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Env } from "../../../env";

const requestClientSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string().min(11),
    cpf: z.string().min(11),
    birthDateAt: z.string(),
    attachments: z.string().array().optional()
})

type ClientRequest = z.infer<typeof requestClientSchema>

@Controller('/clients')
@UsePipes(new ZodValidationPipe(requestClientSchema))
export class CreateClientController {

    constructor(
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly jwtService: JwtService,
        private configService: ConfigService<Env>
    ) {}

    @Post('/account')
    async handle(@Body() body: ClientRequest, @Res() res: Response) {

        const {name,email,password,phone,cpf,birthDateAt, attachments} = body

        const {value, isLeft} = await this.createClientUseCase.execute({
            birthDateAt,
            cpf,
            email,
            name,
            password,
            phone,
            attachmentsIds: attachments ?? []
        })

        if(isLeft()) {
            return res.status(value.code).json(value)
        }

        return res.status(201).json({
            message: 'success',
            partialAcessToken: {
            details: 'Use este token para utilizar o recurso de verificação de email, se o token tiver expirado, faça login novamente',
            token: this.jwtService.sign({
                sub: value.client._id.toValue,
                permission: value.client.permission
            }, 
            {
                expiresIn: '15m'
            })
        }
        })
    }
        
}
