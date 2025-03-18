import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { Client } from "../../enterprise/entities/client";
import { Either, left, right } from "services/barber-shop-service-api/src/core/either";
import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repositorie";

type GetClientsUseCaseResponse = Either<null, Client[]>

@Injectable()
export class GetClientsUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute(): Promise<GetClientsUseCaseResponse> {

        const clients = await this.repository.find()
        if(!clients) {
            return left(new Error())
        }
        return right(clients)
    }

}