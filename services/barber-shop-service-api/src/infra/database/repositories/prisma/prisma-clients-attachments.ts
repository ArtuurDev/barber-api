import { PrismaService } from "./prisma.service";
import { ClientAttachments } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client-attachments";
import { Injectable } from "@nestjs/common";
import { ClientAttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-attachment-repository";

@Injectable()
export class PrismaClientAttachment implements ClientAttachmentRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    async createMany(attachment: ClientAttachments[]): Promise<any> {
        
        const attachmentIds = attachment.map(item => {
            return item.attachmentId.toValue
        })

        if(attachmentIds.length < 1) {
            return
        }

        return this.prisma.attachment.updateMany({
            where: {
                id: {
                    in: attachmentIds
                }
            }, data: {
                clientId: attachment[0].clientAttachmentsId.toValue
            }
        })

    }

}