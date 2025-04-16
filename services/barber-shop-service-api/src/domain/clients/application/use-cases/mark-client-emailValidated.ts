import { left, right } from "services/barber-shop-service-api/src/core/either";
import { ClientRepository } from "../repositories/client-repositorie";
import { IdNotExists } from "../../../errors/id-not-exists";
import { Client } from "../../enterprise/entities/client";
import { Injectable } from "@nestjs/common";
import { EmailValidated } from "../../../events/email-validated";

interface MarkClientEmailValidatedRequest {
    id: string
}

@Injectable()
export class MarkClientEmailValidatedUseCase {

    constructor(
    private readonly clientRepository: ClientRepository
    ) {}

    async execute({id}: MarkClientEmailValidatedRequest) {

        const clientId = await this.clientRepository.findById(id) 
        if(!clientId) {
            return left(new IdNotExists())
        }
        const client = Client.create({
            birthDateAt: clientId.birthDateAt,
            cpf: clientId.cpf,
            email: clientId.email,
            name: clientId.name,
            password: clientId.password,
            phone: clientId.phone,
            attachments: clientId.attachments,
            emailValidated: true,
            createdAt: clientId.createdAt,
            updatedAt: new Date(),
            permission: 'CLIENT'
        }, clientId._id)

        client.addDomainEvent(new EmailValidated(client))

        await this.clientRepository.save(client)
        return right({
            client
        })
    }

}