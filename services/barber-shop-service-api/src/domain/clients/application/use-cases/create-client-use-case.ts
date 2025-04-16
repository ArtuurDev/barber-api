import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { formatCpf } from "services/barber-shop-service-api/src/core/utils/formated-cpf"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { ClientAttachments } from "../../enterprise/entities/client-attachments"
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id"
import { ClientAttachmentlist } from "../../enterprise/entities/client-attachment-list"
import { formatPassord } from "services/barber-shop-service-api/src/core/utils/formated-passord"
import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"
import { CpfFormatIncorretly } from "../../../errors/cpf-format-incorretly"
import { EmailDuplicate } from "../../../errors/email-duplicate"
import { CpfDuplicate } from "../../../errors/cpf-duplicate"
import { PhoneDuplicate } from "../../../errors/phone-duplicate"
import { PasswordFormatIncorretly } from "../../../errors/password-format-incorretly"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repositorie"
import { Injectable } from "@nestjs/common"
import { formatEmail } from "services/barber-shop-service-api/src/core/utils/email-formated"
import { EmailFormatIncorretly } from "../../../errors/email-format-incorretly"
import { CryptograpyRepository } from "../cryptograpy/cryptograpy-repository"

export interface ClientUseCaseRequest {
    name: string
    email: string
    password: string
    phone: string
    attachmentsIds: string[] 
    cpf: string
    birthDateAt: string
    createdAt?: Date
    updatedAt?: Date
}

type ClientUseCaseResponse = 
Either<
PhoneFormatIncorretly | 
CpfFormatIncorretly | 
EmailDuplicate |
CpfDuplicate |
PhoneDuplicate |
PasswordFormatIncorretly |
EmailFormatIncorretly, 
Client>

@Injectable()
export class CreateClientUseCase {
    constructor(
    private readonly repository: ClientRepository,
    private readonly passwordHashRepository: CryptograpyRepository
    ) {}

    async execute({birthDateAt,email,name,password,phone,cpf, attachmentsIds}: ClientUseCaseRequest): Promise<ClientUseCaseResponse> {

        try {
        const formattedCpf = formatCpf(cpf)
        const formattedPhone = formatPhone(phone)
        const formattedPassword = formatPassord(password)
        const formattedEmail = formatEmail(email)

        const cpfAlreadyExists = await this.repository.findByCpf(formattedCpf)
        if(cpfAlreadyExists) {
            throw new CpfDuplicate("CPF incorreto")
        }

        const emailAlreadyExists = await this.repository.findByEmail(formattedEmail)
        if(emailAlreadyExists) {
            throw new EmailDuplicate()
        }

        const phoneAlreadyExists = await this.repository.findByPhone(formattedPhone)
        if(phoneAlreadyExists) {
            throw new PhoneDuplicate()
        }

        const passordHash = await this.passwordHashRepository.hash(formattedPassword)

        const client = Client.create({
            name,
            email,
            password: passordHash,
            phone,
            birthDateAt: new Date(birthDateAt),
            cpf,
            permission: 'CLIENT'
        })

        
        const attachments = attachmentsIds.map(atachment => {
            return ClientAttachments.create({
                attachmentId: new UniqueEntityId(atachment),
                clientId: new UniqueEntityId(client._id.toValue)
            })
        })
    
        client.attachments = new ClientAttachmentlist(attachments)
    
        await this.repository.create(client)

        return right({
            client
        })

        }
        catch(err) {
            return left(err)
        }
    }
        
}