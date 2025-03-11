import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"
import { Either, left, right } from "../../@core/either"
import { Client } from "../enterprise/entities/client"
import { ClientRepository } from "./repositories/client-repositorie"

export interface ClientUseCaseRequest {
    name: string
    email: string
    password: string
    phone: string
    cpf: string
    birthDateAt: Date
    createdAt?: Date
    updatedAt?: Date
}

type ClientUseCaseResponse = Either<PhoneFormatIncorretly, Client>

export class CreateClientUseCase {

    constructor(
        private readonly repository: ClientRepository
    ) {}

    async execute({birthDateAt,email,name,password,phone,cpf}: ClientUseCaseRequest): Promise<ClientUseCaseResponse> {

        const client = Client.create({
            name,
            email,
            password,
            cpf,
            phone,
            birthDateAt
        })

        if(!client) {
            return left(new PhoneFormatIncorretly())
        }

        await this.repository.create(client)

        return right(
            client
        )
    }
        
    
}