import { ClientRepository } from "../repositories/client-repositorie";
import {Either, left, right} from '../../../../core/either'
import { IdNotExists } from "../../../errors/id-not-exists";
import { Client } from "../../enterprise/entities/client";
import { Injectable } from "@nestjs/common";

interface fetchClientUseCaseRequest {
    clientId: string
}


type fetchClientUseCaseResponse = Either<IdNotExists, Client>

@Injectable()
export class FetchProfileClientUseCase {

    constructor(
    private readonly clientRepository: ClientRepository   
    ) {} 


    async execute({clientId}: fetchClientUseCaseRequest): Promise<fetchClientUseCaseResponse> {

        const client = await this.clientRepository.findById(clientId)
        if(!client) {
            return left(new IdNotExists())
        }

        return right({
            client
        })

    }

}