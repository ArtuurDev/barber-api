import { UniqueEntityId } from "../../core/entitys/unique-entity-id";
import { DomainEvent } from "../../core/events/domain-event";
import { Client } from "../clients/enterprise/entities/client";

export class EmailValidated implements DomainEvent {
    ocurredAt: Date;
    event: Client
    getAggregateId(): UniqueEntityId {
        return this.event._id
    }
    constructor(event: Client) {
        this.ocurredAt = new Date()
        this.event = event
    }
}