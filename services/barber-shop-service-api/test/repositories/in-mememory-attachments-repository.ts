import { AttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/attachment-repository";
import { Attachments } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/attachments";

export class InMemoryAttachmentsRepository implements AttachmentRepository {
   
    public items: Attachments[] = []

    async create(attachment: Attachments): Promise<any> {

        return this.items.push(attachment)

    }

}