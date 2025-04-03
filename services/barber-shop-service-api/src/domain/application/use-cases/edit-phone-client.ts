import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { ClientRepository } from "../repositories/client-repositorie"
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly"
import { ThisIsYourEmail } from "../../errors/this-is-your-email"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { IdNotExists } from "../../errors/id-not-exists"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { ThisIsYourPhone } from "../../errors/this-is-your-phone"
import { PhoneDuplicate } from "../../errors/phone-duplicate"

export interface EditPhoneUseCaseRequest {
    clientId: string
    phone: string
}

type EditPhoneUseCaseResponse = Either<IdNotExists | 
PhoneFormatIncorretly | 
ThisIsYourPhone | 
PhoneDuplicate, 
null>

export class EditPhoneUseCase {
    
    constructor(
    private readonly clientRepository: ClientRepository
    ) 
    {}

    async execute({clientId,phone}: EditPhoneUseCaseRequest): Promise<EditPhoneUseCaseResponse> {

        const client = await this.clientRepository.findById(clientId)
        if(!client) {
            return left(new IdNotExists())
        }

        if(client.phone === phone) {
            return left(new ThisIsYourPhone())
        }

        const phoneAlreadyExists = await this.clientRepository.findByPhone(phone)
        if(phoneAlreadyExists) {
            return left(new PhoneDuplicate())
        }

        try {
            client.phone = phone
            this.clientRepository.save(client)
            return right({})
        } 
        catch (err) {
            if(err instanceof PhoneFormatIncorretly) {
                return left(err)
            }
            return left(err)
        }
    }

}