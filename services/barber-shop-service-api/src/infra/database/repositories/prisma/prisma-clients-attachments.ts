import { CiientAttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-attachment-repository";
import { PrismaService } from "./prisma.service";
import { ClientAttachments } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client-attachments";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaClientAttachment implements CiientAttachmentRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    async createMany(attachment: ClientAttachments[]): Promise<any> {
        
        const attachmentIds = attachment.map(item => {
            return item.attachmentId.toValue
        })

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