import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { CreateClientUseCase } from "services/barber-shop-service-api/src/domain/application/use-cases/create-client-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";

const requestClientSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    cpf: z.string(),
    birthDateAt: z.string()
})

type ClientRequest = z.infer<typeof requestClientSchema>

@Controller()
export class CreateClientController {

    constructor(
        private readonly createClientUseCase: CreateClientUseCase
    ) {}

    @Post('/create')
    @UsePipes(new ZodValidationPipe(requestClientSchema))
    async handle(@Body() body: ClientRequest, @Res() res: Response) {

        const {name,email,password,phone,cpf,birthDateAt} = body

        const result = await this.createClientUseCase.execute({
            birthDateAt,
            cpf,
            email,
            name,
            password,
            phone
        })

        if(result.isLeft()) {
            return res.status(result.value.code).json(result.value)
        }

        return res.status(201).json({
            message: 'success'
        })
        
    }
}