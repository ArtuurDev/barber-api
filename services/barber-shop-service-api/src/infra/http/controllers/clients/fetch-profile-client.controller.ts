import { Controller, Get, Param, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { FetchProfileClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/fetch-client";
import { Roles } from "../../auth/enum-role";
import { AuthGuard } from "../../auth/auth-guard";
import { FetchProfileClientPresenter } from "../../presenters/fetch-profile.presenter";



@Controller('/clients')
export class FetchProfileClientController {

    constructor(
    private readonly fetchClientUseCase: FetchProfileClientUseCase
    ) {}

    @Get('/profile')
    @UseGuards(AuthGuard)
    @Roles(['CLIENT', 'ADMIN'])
    async handle(@Req() req: Request, @Res() res: Response) {

        const {value, isLeft} = await this.fetchClientUseCase.execute({
            clientId: req.user.sub
        })
        if(isLeft()) {
            return res.status(value.code).json(value)
        }
        return res.status(200).json({
            client: FetchProfileClientPresenter.toHttp(value.client)
    })
    }

}