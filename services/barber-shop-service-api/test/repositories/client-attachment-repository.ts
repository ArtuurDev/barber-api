import { ClientAttachmentsRepository } from "services/barber-shop-service-api/src/domain/application/repositories/client-attachments-repository";
import { ClientAttachments } from "services/barber-shop-service-api/src/domain/enterprise/entities/client-attachments";

export class InMemoryClientAttachmentsRepository implements ClientAttachmentsRepository {
    
    public items: ClientAttachments[] = []

    async findManyByClientId(clientId: string): Promise<ClientAttachments[]> {
    
        const attachment = this.items.filter(item => item.clientAttachmentsid.toValue === clientId)

        return attachment

    }

}