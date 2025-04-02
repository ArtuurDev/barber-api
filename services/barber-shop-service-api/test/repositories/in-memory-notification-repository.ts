import { NotificationRepository } from "services/barber-shop-service-api/src/domain/notification/application/reposiotories/notifications-repository";
import { Notification } from "services/barber-shop-service-api/src/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationRepository implements NotificationRepository{
   
    public items: Notification[] = []

    async create(notification: Notification): Promise<any> {

        this.items.push(notification)

    }

}