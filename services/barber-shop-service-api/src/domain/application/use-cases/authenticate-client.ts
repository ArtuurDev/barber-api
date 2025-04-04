import { left, right } from "services/barber-shop-service-api/src/core/either";
import { ClientRepository } from "../repositories/client-repositorie";
import { Injectable } from "@nestjs/common";
import { AuthenticateError } from "../../errors/authenticate";
import { PasswordHashRepository } from "../repositories/password-hash-repository";

export interface AuthenticateRequest {

    email: string
    password: string
    
}

@Injectable()
export class AuthenticateClientUseCase {
    
    constructor(
    private readonly clientRepository: ClientRepository,
    private readonly passwordHashRepository: PasswordHashRepository
    ) {} 

    async execute({email, password}: AuthenticateRequest) {


        const client = await this.clientRepository.authenticate(email)

        if(!client) {
            return left(new AuthenticateError())
        }

        const passordHashed = await this.passwordHashRepository.compare(password, client.password)
        if(!passordHashed) {
            return left(new AuthenticateError())
        }

        return right({
            client
        })

    }
}