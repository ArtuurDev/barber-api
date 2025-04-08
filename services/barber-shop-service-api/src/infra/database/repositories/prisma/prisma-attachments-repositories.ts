import { Injectable } from "@nestjs/common";
import { AttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/attachment-repository";
import { Attachments } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/attachments";

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
    create(attachment: Attachments): Promise<Attachments> {
        throw new Error("Method not implemented.");
    }

}