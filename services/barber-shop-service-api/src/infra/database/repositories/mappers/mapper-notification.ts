import { Notification as NotificationDomain } from "services/barber-shop-service-api/src/domain/notification/enterprise/entities/notification"
import { Notification as NotificationPrisma, Prisma } from "@prisma/client"
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id"

export class PrismaMapperNotification {

    static toDomain(notification: NotificationPrisma): NotificationDomain {

        return NotificationDomain.create({
            title: notification.title,
            content: notification.content,
            recipientId: new UniqueEntityId(notification.recipientId,)
        }, new UniqueEntityId(notification.id))
    }

    static toPrisma(notification: NotificationDomain) {

        const notificationPrisma: Prisma.NotificationUncheckedCreateInput = {
            id: notification._id.toValue,
            content: notification.content,
            createdAt: notification.createdAt,
            recipientId: notification.recipientId,
            title: notification.title
        }
        return notificationPrisma
    }
}