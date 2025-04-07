import { right } from "services/barber-shop-service-api/src/core/either"
import { Notification, NotificationProps } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../reposiotories/notifications-repository"

export interface SendNotificationRequest {
    recipientID: string
    title: string
    content: string
}

export class SendNotificationUseCase {
    constructor(
    private readonly notificationRepository: NotificationRepository
    ) {}

    async execute({content,recipientId,title}: NotificationProps) {

        const notification = Notification.create({
            content,
            recipientId,
            title            
        })

        await this.notificationRepository.create(notification)

        return right({
            notification
        })

    }

}