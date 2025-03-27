import { left, right } from "services/barber-shop-service-api/src/core/either";
import { ClientRepository } from "../repositories/client-repositorie";
import { IdNotExists } from "../../errors/id-not-exists";
import { ClientAttachmentlist } from "../../enterprise/entities/client-attachment-list";
import { ClientAttachments } from "../../enterprise/entities/client-attachments";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { ClientAttachmentsRepository } from "../repositories/client-attachments-repository";

export interface ClientEditAttachmentRequest {
    clientId: string
    attachmentsIds: string[]
}
export class EditAttachmentClientUseCase {

    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly clientAttachmentRepository: ClientAttachmentsRepository
    ) {}

    async execute({attachmentsIds, clientId}: ClientEditAttachmentRequest) {

        const client = await this.clientRepository.findById(clientId)
        if(!client) {
            return left(new IdNotExists())
        }

        const currentClientAttachments = await this.clientAttachmentRepository.findManyByClientId(clientId)
        const questionAttachmentsList = new ClientAttachmentlist(currentClientAttachments)

        const attachments = attachmentsIds.map(atachment => {
            return ClientAttachments.create({
                attachmentId: new UniqueEntityId(atachment),
                clientId: new UniqueEntityId(client._id.toValue)
                })
        })
    
        questionAttachmentsList.update(attachments)

        client.attachments = questionAttachmentsList

        await this.clientRepository.save(client)

        return right(client)

    }

}