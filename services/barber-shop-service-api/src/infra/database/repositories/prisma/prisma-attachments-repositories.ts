import { Injectable } from "@nestjs/common";
import { AttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/attachment-repository";
import { Attachments } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/attachments";
import { PrismaService } from "./prisma.service";
import { PrismaMapperAttachments } from "../mappers/mappers-attachments";

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
    constructor(private readonly prisma: PrismaService) {

    }
    create(attachment: Attachments): Promise<any> {
        const data = PrismaMapperAttachments.toPrisma(attachment)
        
        return this.prisma.attachment.create({
            data: {
                title: data.title,
                url: data.url,
                id: attachment._id.toValue
            }
        })
    }

}