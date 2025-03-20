import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { CpfDuplicate } from "../../errors/cpf-duplicate"
import { IdNotExists } from "../../errors/id-not-exists"
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly"
import { ThisIsYourEmail } from "../../errors/this-is-your-email"
import { ThisIsYourPhone } from "../../errors/this-is-your-phone"
import { PhoneDuplicate } from "../../errors/phone-duplicate"
import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { formatEmail } from "services/barber-shop-service-api/src/core/utils/email-formated"
import { formatPassord } from "services/barber-shop-service-api/src/core/utils/formated-passord"
import { ThisIsYourPassword } from "../../errors/this-is-your-password"
import { Injectable } from "@nestjs/common"

export interface UpdateClientUseCaseRequest {
    name?: string
    email?: string
    password?: string
    phone?: string
}

type UpdatedUseCaseResponse = 
Either<PhoneFormatIncorretly |  
EmailDuplicate |
CpfDuplicate |
PasswordFormatIncorretly, 
Client>

@Injectable()
export class UpdateClientUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute({email,name,password,phone}: UpdateClientUseCaseRequest, id: string): Promise<UpdatedUseCaseResponse> {

        try {

        const client = await this.repository.findById(id)
        if(!client) {
            throw new IdNotExists()
        }

        if(phone) {
            const phoneIsValid = formatPhone(phone)
            if(phoneIsValid === client.phone) {
                throw new ThisIsYourPhone()
            }
            const phoneAlreadyExists = await this.repository.findByPhone(phoneIsValid)
            if(phoneAlreadyExists) {
                throw new PhoneDuplicate()
            }
        }

        if(email) {
        const emailIsValid = formatEmail(email) 
        if(emailIsValid === client.email) {
            throw new ThisIsYourEmail()
        }
        const emailAlreadyExists = await this.repository.findByEmail(emailIsValid)
            if(emailAlreadyExists) {
                throw new EmailDuplicate()
            }
        }

        if (password) {
            const passwordValidated = formatPassord(password)
            if (passwordValidated === client.password) {
                throw new ThisIsYourPassword()
            }
        }
        const clientUpdated = Client.update(
            client,
        {
            name: name ?? client.name,
            email: email ?? client.email,
            password: password ?? client.password,
            phone: phone ?? client.phone
        },
            client._id.toValue)

        await this.repository.save(clientUpdated)

        return right({
            client
        })
    }  catch(err) {

            if(
                err instanceof PhoneFormatIncorretly ||
                err instanceof EmailFormatIncorretly ||
                err instanceof IdNotExists ||
                err instanceof ThisIsYourEmail ||
                err instanceof ThisIsYourPhone ||
                err instanceof PhoneDuplicate ||
                err instanceof ThisIsYourPassword ||
                err instanceof PasswordFormatIncorretly
            ) {
                return left(err)
            }

            return left(err)
        }
    }
}

