import { DomainEvents } from "services/barber-shop-service-api/src/core/events/domain-events";
import { EventHandler } from "services/barber-shop-service-api/src/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { ClientCreatedEvent } from "../../../clients/events/client-created";

export class OnClientCreated implements EventHandler {

    constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendClientNotification.bind(this), ClientCreatedEvent.name)
    }

    private async sendClientNotification({client}: ClientCreatedEvent) {
        
        await this.sendNotificationUseCase.execute({
            content: `Seja muito bem vindo a barbearia, ${client.name}`,
            recipientId: client._id,
            title: "Sr.Edgar Barbearia lhe deseja boas vindas",
        })

    }

}