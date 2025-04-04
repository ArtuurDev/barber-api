import { IdNotExists } from "../../errors/id-not-exists";
import { Client } from "../../enterprise/entities/client";
import { Either, left, right } from "services/barber-shop-service-api/src/core/either";
import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repositorie";


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

        const removed = await this.repository.delete(id)

        if(!removed) {
            return left(new Error('Internal Server'))
        }

        return right(removed)

    }

}