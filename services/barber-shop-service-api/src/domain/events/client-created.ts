// import { UniqueEntityId } from "../../core/entitys/unique-entity-id";
// import { DomainEvent } from "../../core/events/domain-event";
// import { Client } from "../clients/enterprise/entities/client";

// export class ClientCreated implements DomainEvent {
//     ocurredAt: Date;
//     client: Client
//     getAggregateId(): UniqueEntityId {
//         return this.client._id
//     }

//     constructor(event: Client) {
//         this.client = event
//         this.ocurredAt = new Date()
//     }

// }