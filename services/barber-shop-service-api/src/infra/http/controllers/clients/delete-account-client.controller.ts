import { Controller, Delete, Param, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { DeleteClientsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/delete-client";
import { Roles } from "../../auth/enum-role";
import { AuthGuard } from "../../auth/auth-guard";


@Controller('/clients')
@UseGuards(AuthGuard)
export class DeleteClientController {
    constructor(
        private readonly deleteclientUseCase: DeleteClientsUseCase
    ) {}

    @Roles(['CLIENT', 'ADMIN'])
    @Delete('delete/:id')
    async handle(@Param('id') id: string, @Res() res: Response) {

        const result = await this.deleteclientUseCase.execute({
            id
        })
        
        if(result.isLeft()) return res.status(result.value.code).send(result.value)

        return res.status(200).send({
            message: 'success'
        })

    }

}