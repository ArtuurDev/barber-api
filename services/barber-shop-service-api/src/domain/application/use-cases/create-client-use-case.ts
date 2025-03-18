import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { CpfFormatIncorretly } from "../../errors/cpf-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { CpfDuplicate } from "../../errors/cpf-duplicate"
import { Injectable } from "@nestjs/common"
import { formatDate } from "services/barber-shop-service-api/src/core/utils/format-date"
import { PhoneDuplicate } from "../../errors/phone-duplicate"
import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { formatCpf } from "services/barber-shop-service-api/src/core/utils/formated-cpf"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { formatEmail } from "services/barber-shop-service-api/src/core/utils/email-formated"
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly"

export interface ClientUseCaseRequest {
    name: string
    email: string
    password: string
    phone: string
    cpf: string
    birthDateAt: string
    createdAt?: Date
    updatedAt?: Date
}

type ClientUseCaseResponse = 
Either<PhoneFormatIncorretly | 
CpfFormatIncorretly | 
EmailDuplicate |
CpfDuplicate |
PhoneDuplicate |
PasswordFormatIncorretly, 
Client>

@Injectable()
export class CreateClientUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute({birthDateAt,email,name,password,phone,cpf}: ClientUseCaseRequest): Promise<ClientUseCaseResponse> {

        const cpfIsValid = formatCpf(cpf)
        if(!cpfIsValid) {
            return left(new CpfFormatIncorretly())
        }
        const phoneIsValid = formatPhone(phone)
        if(!phoneIsValid) {
            return left(new PhoneFormatIncorretly())
        }
        const emailIsValid = formatEmail(email) 
        if(!emailIsValid) {
            return left(new EmailFormatIncorretly())
        }


        const cpfAlreadyExists = await this.repository.findByCpf(cpfIsValid)

        if(cpfAlreadyExists) {
            return left(new CpfDuplicate())
        }

        const emailAlreadyExists = await this.repository.findByEmail(email)

        if(emailAlreadyExists) {
            return left(new EmailDuplicate())
        }

        const phoneAlreadyExists = await this.repository.findByPhone(phoneIsValid)

        if(phoneAlreadyExists) {
            return left(new PhoneDuplicate())
        }

        try {

            const client = Client.create({
                name,
                email,
                password,
                phone,
                birthDateAt: formatDate(birthDateAt),
                cpf
            })

            await this.repository.create(client)

            return right(
                client
            )
        }
        catch(err) {
            
            if(err instanceof CpfFormatIncorretly) {
                return left(err)
            }

            if(err instanceof PasswordFormatIncorretly) {
                return left(err)
            }

            if(err instanceof PhoneFormatIncorretly) {
                return left(err)
            }
            
            return left(err)
        }
    }
        
}