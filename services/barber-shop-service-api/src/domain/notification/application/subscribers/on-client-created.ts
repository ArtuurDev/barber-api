import { DomainEvents } from "services/barber-shop-service-api/src/core/events/domain-events";
import { EventHandler } from "services/barber-shop-service-api/src/core/events/event-handler";
import { ClientCreatedEvent } from "../../../enterprise/events/client-created";

export class OnClientCreated implements EventHandler {

    constructor() {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendClientNotification.bind(this), ClientCreatedEvent.name)
    }

    private async sendClientNotification({client}: ClientCreatedEvent) {
        console.log(client)
    }

}