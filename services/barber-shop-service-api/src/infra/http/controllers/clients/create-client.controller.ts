import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";
import { CreateClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/create-client-use-case";

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
        private readonly createClientUseCase: CreateClientUseCase
    ) {}

    @Post()
    async handle(@Body() body: ClientRequest, @Res() res: Response) {

        const {name,email,password,phone,cpf,birthDateAt, attachments} = body

        const result = await this.createClientUseCase.execute({
            birthDateAt,
            cpf,
            email,
            name,
            password,
            phone,
            attachmentsIds: attachments
        })

        if(result.isLeft()) {
            return res.status(result.value.code).json(result.value)
        }

        return res.status(201).json({
            message: 'success'
        })
        
    }
}