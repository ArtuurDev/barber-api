import { Body, Controller, Param, Put, Res, UsePipes } from "@nestjs/common";
import { UpdateClientUseCase } from "services/barber-shop-service-api/src/domain/application/use-cases/update-client";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";

const requestClientSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    phone: z.string().min(11).optional(),
})

type ClientUpdateRequest = z.infer<typeof requestClientSchema>


@Controller('/clients')
export class UpdateClientController {

    constructor(
        private readonly updateClientUseCase: UpdateClientUseCase
    ) {}

    @Put('/:id')
    async handle(
        @Body(new ZodValidationPipe(requestClientSchema)) body: ClientUpdateRequest, 
        @Param('id') id: string,
        @Res() res: Response
    ) {

        if(!id) {
            return res.status(400).send({
                message: 'Id obrigatorio'
            })
        }

        const {email,name,password,phone} = body

        const result = await this.updateClientUseCase.execute({
            email,
            name,
            password,
            phone
        }, id)

        if(result.isLeft()) {
            return res.status(result.value.code).json(result.value)
        } 

        return res.status(201).send({
            message: 'success'
        })

    }

}