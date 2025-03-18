import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { Client } from "../../enterprise/entities/client";
import { Either, right } from "services/barber-shop-service-api/src/core/either";

type GetClientsUseCaseResponse = Either<unknown, Client[]>

export class GetClientsUseCase {
    constructor(
    private readonly repository: ClientInMemoryRepository
    ) {}

    async execute(): Promise<GetClientsUseCaseResponse> {

        const clients = await this.repository.find()
        return right({clients})
    }

}