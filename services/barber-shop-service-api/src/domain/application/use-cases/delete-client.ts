import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { Either, left, right } from "../../../core/either";
import { IdNotExists } from "../../errors/id-not-exists";
import { Client } from "../../enterprise/entities/client";


interface DeleteClientsUseCaseRequest {
    id: string
}

type DeleteClientsUseCaseResponse = Either<IdNotExists, Client>

export class DeleteClientsUseCase {
    constructor(
    private readonly repository: ClientInMemoryRepository
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