import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { GetClientsUseCase } from "services/barber-shop-service-api/src/domain/application/use-cases/get-clients";
import { GetListClientPresenter } from "../../presenters/get-clients-presenter";

@Controller("/clients")
export class GetClientsController {

    constructor(private readonly listClientsUseCase: GetClientsUseCase) {

    }

    @Get('clients')
    async handle(@Res() res: Response) {

        const {value} = await this.listClientsUseCase.execute()
    
        if(!value) {
            return res.send(value)
        }

       const clients = value.map(GetListClientPresenter.toHttp)

       return res.send({
        clients: clients
       })
        
      
    }

}