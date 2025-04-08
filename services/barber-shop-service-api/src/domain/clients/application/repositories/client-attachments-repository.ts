import { ClientAttachments } from "../../enterprise/entities/client-attachments";

export abstract class ClientAttachmentsRepository {
    abstract findManyByClientId(clientId: string): Promise<ClientAttachments[]>
}