import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"
import { Either, left, right } from "../../../core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { PasswordFormatIncorretly } from "../../../errors/password-format-incorretly"
import { EmailDuplicate } from "../../../errors/email-duplicate"
import { CpfDuplicate } from "../../../errors/cpf-duplicate"
import { IdNotExists } from "../../../errors/id-not-exists"
import { EmailFormatIncorretly } from "../../../errors/email-format-incorretly"
import { ThisIsYourEmail } from "../../../errors/this-is-your-email"

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

        const CLIENT = await this.repository.findById(id)
        
        if(!CLIENT) {
            return left(new IdNotExists())
        }

        if(email === CLIENT.email) {
            return left(new ThisIsYourEmail())
        }

        if(email) {
        const emailAlreadyExists = await this.repository.findByEmail(email)
            if(emailAlreadyExists) {
                return left(new EmailDuplicate())
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

            await this.repository.save(client, CLIENT._id.toValue)

            return right({
                client
            })
        }
        catch(err) {
    
            if(err instanceof PasswordFormatIncorretly) {
                return left(new PasswordFormatIncorretly())
            }

            if(err instanceof PhoneFormatIncorretly) {
                return left(new PhoneFormatIncorretly())
            }

            if(err instanceof EmailFormatIncorretly) {
                return left(err)
            }

            return left(err)
        }
    }
        
}