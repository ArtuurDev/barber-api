import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { CpfFormatIncorretly } from "../../errors/cpf-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { CpfDuplicate } from "../../errors/cpf-duplicate"
import { Injectable } from "@nestjs/common"
import { PhoneDuplicate } from "../../errors/phone-duplicate"
import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { formatCpf } from "services/barber-shop-service-api/src/core/utils/formated-cpf"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { ClientAttachments } from "../../enterprise/entities/client-attachments"
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id"
import { ClientAttachmentlist } from "../../enterprise/entities/client-attachment-list"
import { PasswordHashRepository } from "../repositories/password-hash-repository"
import { formatPassord } from "services/barber-shop-service-api/src/core/utils/formated-passord"

export interface ClientUseCaseRequest {
    name: string
    email: string
    password: string
    phone: string
    attachmentsIds?: string[] 
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
    private readonly repository: ClientRepository,
    private readonly passwordHashRepository: PasswordHashRepository
    ) {}

    async execute({birthDateAt,email,name,password,phone,cpf, attachmentsIds}: ClientUseCaseRequest): Promise<ClientUseCaseResponse> {

        try {

        const cpfValid = formatCpf(cpf)
        const phoneValid = formatPhone(phone)
        const passwordIsValid = formatPassord(password)

        if(!passwordIsValid) {
            throw new PasswordFormatIncorretly()
        }

        const cpfAlreadyExists = await this.repository.findByCpf(cpfValid)
        if(cpfAlreadyExists) {
            throw new CpfFormatIncorretly()
        }

        const emailAlreadyExists = await this.repository.findByEmail(email)
        if(emailAlreadyExists) {
            throw new EmailDuplicate()
        }

        const phoneAlreadyExists = await this.repository.findByPhone(phoneValid)
        if(phoneAlreadyExists) {
            throw new PhoneDuplicate()
        }

        const passordHash = await this.passwordHashRepository.hash(password)

        const client = Client.create({
            name,
            email,
            password: passordHash,
            phone,
            birthDateAt: new Date(birthDateAt),
            cpf,
        })

        if(attachmentsIds) {
            const attachments = attachmentsIds.map(atachment => {
                return ClientAttachments.create({
                    attachmentId: new UniqueEntityId(atachment),
                    clientId: new UniqueEntityId(client._id.toValue)
                })
            })
    
            client.attachments = new ClientAttachmentlist(attachments)
        }

        await this.repository.create(client)

        return right(
            client
        )

        }
        catch(err) {
            
            if(
                err instanceof CpfFormatIncorretly || 
                err instanceof PhoneFormatIncorretly ||
                err instanceof CpfDuplicate || 
                err instanceof EmailDuplicate ||
                err instanceof PhoneDuplicate
            ) {
                return left(err)
            }
            
            return left(err)
        }
    }
        
}