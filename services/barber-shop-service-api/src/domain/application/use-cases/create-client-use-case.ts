import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { Either, left, right } from "../../../core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { CpfFormatIncorretly } from "../../errors/cpf-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { CpfDuplicate } from "../../errors/cpf-duplicate"

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

type ClientUseCaseResponse = 
Either<PhoneFormatIncorretly | 
CpfFormatIncorretly | 
EmailDuplicate |
CpfDuplicate |
PasswordFormatIncorretly, 
Client>

export class CreateClientUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute({birthDateAt,email,name,password,phone,cpf}: ClientUseCaseRequest): Promise<ClientUseCaseResponse> {

        const cpfAlreadyExists = await this.repository.findByCpf(cpf)

        if(cpfAlreadyExists) {
            return left(new CpfDuplicate())
        }

        const emailAlreadyExists = await this.repository.findByEmail(email)

        if(emailAlreadyExists) {
            return left(new EmailDuplicate())
        }

        try {

            const client = Client.create({
                name,
                email,
                password,
                phone,
                birthDateAt,
                cpf
            })

            await this.repository.create(client)

            return right(
                client
            )
        }
        catch(err) {
            
            if(err instanceof CpfFormatIncorretly) {
                return left(new CpfFormatIncorretly())
            }

            if(err instanceof PasswordFormatIncorretly) {
                return left(new PasswordFormatIncorretly())
            }

            if(err instanceof PhoneFormatIncorretly) {
                return left(new PhoneFormatIncorretly())
            }
            
            return left(err)
        }
    }
        
}