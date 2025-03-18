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

export class UpdateClientUseCase {
    constructor(
    private readonly repository: ClientRepository
    ) {}

    async execute({email,name,password,phone}: UpdateClientUseCaseRequest, id: string): Promise<UpdatedUseCaseResponse> {

        const phoneIsValid = formatPhone(phone)
        if(!phoneIsValid) {
            return left(new PhoneFormatIncorretly())
        }
        const emailIsValid = formatEmail(email) 
        if(!emailIsValid) {
            return left(new EmailFormatIncorretly())
        }
        

        const CLIENT = await this.repository.findById(id)
        
        if(!CLIENT) {
            return left(new IdNotExists())
        }

        if(email === CLIENT.email) {
            return left(new ThisIsYourEmail())
        }

        if(email) {
        const emailAlreadyExists = await this.repository.findByEmail(emailIsValid)
            if(emailAlreadyExists) {
                return left(new EmailDuplicate())
            }

        
        if(phone === CLIENT.phone) {
            return left(new ThisIsYourPhone())
        }

        if(phone) {
            const phoneAlreadyExists = await this.repository.findByPhone(phoneIsValid)
            if(phoneAlreadyExists) {
                return left(new PhoneDuplicate())
            }
        }

        }
        try {

            const client = Client.update(
                CLIENT,
            {
                name: name ?? CLIENT.name,
                email: email ?? CLIENT.email,
                password: password ?? CLIENT.password,
                phone: phone ?? CLIENT.phone
            },
                CLIENT._id.toValue,
        )

            await this.repository.save(client)

            return right({
                client
            })
        }
        catch(err) {
    
            if(err instanceof PasswordFormatIncorretly) {
                return left(err)
            }

            if(err instanceof PhoneFormatIncorretly) {
                return left(err)
            }

            if(err instanceof EmailFormatIncorretly) {
                return left(err)
            }

            return left(err)
        }
    }
        
}