import { Client } from "../../enterprise/entities/client";
import { Either, left, right } from "services/barber-shop-service-api/src/core/either";
import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repositorie";
import { IdNotExists } from "../../../errors/id-not-exists";


interface DeleteClientsUseCaseRequest {
    id: string
}

type DeleteClientsUseCaseResponse = Either<IdNotExists, Client>

@Injectable()
export class DeleteClientsUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute({id}: DeleteClientsUseCaseRequest): Promise<DeleteClientsUseCaseResponse> {

        const isValidId = await this.repository.findById(id)
        if(!isValidId) {
            return left(new IdNotExists())
        }

        await this.repository.delete(id)

        return right({
            
        })

    }

}