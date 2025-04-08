import { Body, Controller, Param, Put, Res, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";
import { EditEmailUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/edit-email-client";


const editEmailSchema = z.object({
    email: z.string().email()
})

type editEmailRequest = z.infer<typeof editEmailSchema>

@UsePipes(new ZodValidationPipe(editEmailSchema))
@Controller('/clients')
export class EditEmailClientController {

    constructor(
        private readonly editEmailUseCase: EditEmailUseCase
    ) {}

    @Put(':id')
    async handle(@Body() body: editEmailRequest, @Param('id') id: string, @Res() res: Response) {

        const {email} = body 

        const result = await this.editEmailUseCase.execute({
            clientId: id,
            email
        })

        if(result.isLeft()) {
            return res.status(result.value.code).json(result.value.toJson())
        }

        return res.status(200).json({
            message: 'success'
        })

    } 

}