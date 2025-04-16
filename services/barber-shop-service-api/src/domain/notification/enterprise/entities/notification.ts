import { Entity } from "services/barber-shop-service-api/src/core/entitys/entity";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { Optional } from "services/barber-shop-service-api/src/core/types/optional";

export interface NotificationProps {
    recipientId: UniqueEntityId
    title: string
    content: string
    createdAt?: Date
    read?: Date
}

export class Notification extends Entity<NotificationProps> {
    get recipientId() {
        return this.props.recipientId.toValue
    }

    get content() {
        return this.props.content
    }

    get createdAt() {
        return this.props.createdAt
    }

    get read() {
        return this.props.read
    }

    get title() {
        return this.props.title
    }

    static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityId) {

        const notification = new Notification({
            ...props,
            cretedAt: props.createdAt ?? new Date()
        }, id)

        return notification
    }
}