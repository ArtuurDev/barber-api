import { Prisma, Attachment as PrismaAttachment} from "@prisma/client";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { Attachments, Attachments as AttachmentDomain } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/attachments";
export class PrismaMapperAttachments {

    static toDomain(attachment: PrismaAttachment): AttachmentDomain {

        return Attachments.create({
            title: attachment.title,
            url: attachment.url
        }, new UniqueEntityId(attachment.id))
    }

    static toPrisma(attachment: AttachmentDomain) {

        const clientPrisma: Prisma.AttachmentUncheckedCreateInput = {
            id: attachment._id.toValue,
            title: attachment.title,
            url: attachment.url,
        }
        return clientPrisma
    }


}