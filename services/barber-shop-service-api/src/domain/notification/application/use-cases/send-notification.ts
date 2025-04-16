import { right } from "services/barber-shop-service-api/src/core/either"
import { Notification, NotificationProps } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../reposiotories/notifications-repository"
import { Injectable } from "@nestjs/common"

export interface SendNotificationRequest {
    recipientID: string
    title: string
    content: string
}

@Injectable()
export class SendNotificationUseCase {
    constructor(
    private readonly notificationRepository: NotificationRepository
    ) {}

    async execute({content,recipientId,title}: NotificationProps) {

        const notification = Notification.create({
            content,
            recipientId,
            title,
            createdAt: new Date()            
        })

        await this.notificationRepository.create(notification)

        return right({
            notification
        })

    }

}