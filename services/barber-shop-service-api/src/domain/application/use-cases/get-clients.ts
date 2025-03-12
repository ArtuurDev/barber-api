import { Either, right } from "../../../core/either";
import { ClientInMemoryRepository } from "../../../test/repositories/client-in-memory-repository";
import { Client } from "../../enterprise/entities/client";

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