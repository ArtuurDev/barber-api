import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { Response } from "express";
import { AuthenticateClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/authenticate-client";


const authenticateRequestSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type requestAuthenticate = z.infer<typeof authenticateRequestSchema>

@Controller('/clients')
@UsePipes(new ZodValidationPipe(authenticateRequestSchema))
export class AuthenticateClientController {
    
    constructor(
    private readonly jwt: JwtService,
    private readonly authenticateClient: AuthenticateClientUseCase
    ) {} 


    @Post('/authenticate')
    async handle(@Body() body: requestAuthenticate, @Res() res: Response) {

        const {email, password} = body

        const {value, isLeft} = await this.authenticateClient.execute({
            email,
            password
        })
        
        if(isLeft()) {
            return res.status(value.code).json({
               details: value.toJson()
            })
        }

        return res.status(201).json({
            access_token: this.jwt.sign({
            sub: value.client.id,
            permission: value.client.permission
        }) 
        })

    }

}
