import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { ClientRepository } from "../repositories/client-repositorie"
import { IdNotExists } from "../../../errors/id-not-exists"
import { EmailFormatIncorretly } from "../../../errors/email-format-incorretly"
import { ThisIsYourEmail } from "../../../errors/this-is-your-email"
import { EmailDuplicate } from "../../../errors/email-duplicate"


export interface EditEmailUseCaseRequest {
    clientId: string
    email: string
}

type EditEmailUseCaseResponse = Either<IdNotExists | EmailFormatIncorretly | ThisIsYourEmail | EmailDuplicate, null>

export class EditEmailUseCase {
    
    constructor(
    private readonly clientRepository: ClientRepository
    ) 
    {}

    async execute({clientId,email}: EditEmailUseCaseRequest): Promise<EditEmailUseCaseResponse> {

        const client = await this.clientRepository.findById(clientId)
        if(!client) {
            return left(new IdNotExists())
        }

        if(client.email === email) {
            return left(new ThisIsYourEmail())
        }

        const emailAlreadyExists = await this.clientRepository.findByEmail(email)
        if(emailAlreadyExists) {
            return left(new EmailDuplicate())
        }

        try {
            client.email = email
            this.clientRepository.save(client)
            return right({})
        } 
        catch (err) {
            if(err instanceof EmailFormatIncorretly) {
                console.log(err)
                return left(err)
            }
            console.log(err)
            return left(err)
        }
    }

}