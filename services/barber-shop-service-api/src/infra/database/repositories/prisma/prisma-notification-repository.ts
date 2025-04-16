import { NotificationRepository } from "services/barber-shop-service-api/src/domain/notification/application/reposiotories/notifications-repository";
import { Notification } from "services/barber-shop-service-api/src/domain/notification/enterprise/entities/notification";
import { PrismaService } from "./prisma.service";
import { PrismaMapperNotification } from "../mappers/mapper-notification";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private readonly prisma: PrismaService) {

    }
    async create(notification: Notification): Promise<any> {
        
        const data = PrismaMapperNotification.toPrisma(notification)
        const notificationCreated = await this.prisma.notification.create({
            data
        })

        return notificationCreated
        
    }
}