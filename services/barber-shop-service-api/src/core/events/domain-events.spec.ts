import { test, expect } from "vitest";
import { AggregateRoot } from "../entitys/agregate-root";
import { UniqueEntityId } from "../entitys/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class ClientCreated implements DomainEvent {
    ocurredAt: Date;
    aggregate: ClientAggregate

    getAggregateId(): UniqueEntityId {
        return this.aggregate._id;
    }

    constructor(client: ClientAggregate) {
        this.ocurredAt = new Date()
        this.aggregate = client
        
    }
}

class ClientAggregate extends AggregateRoot<null> {

    constructor() {
        super(null)
    }

    static create() {
        const client = new ClientAggregate()
        client.addDomainEvent(new ClientCreated(client))
        return client
        
    }

}

test('', ()=> {

    DomainEvents.register(() => {console.log('foi')}, ClientCreated.name)

    const client = ClientAggregate.create()
    expect(client.domainEvents).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(client._id)

})