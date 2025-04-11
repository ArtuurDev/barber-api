import { Attachment } from "@prisma/client";
import { ClientAttachments } from "../../enterprise/entities/client-attachments";
import { Client } from "../../enterprise/entities/client";

export abstract class CiientAttachmentRepository {
    abstract createMany(attachments: ClientAttachments[]): Promise<Attachment[]>
}