import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { DomainEvent } from "services/barber-shop-service-api/src/core/events/domain-event";
import { Client } from "../entities/client";

export class ClientCreatedEvent implements DomainEvent {
    public ocurredAt: Date;
    public client: Client
   

    constructor(client: Client) {
        this.client = client
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueEntityId {
        return this.client._id
    }
}