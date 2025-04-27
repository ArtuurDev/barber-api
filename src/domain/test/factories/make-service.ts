import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { ServicesList } from "src/domain/barber-shop/servicesList/enterprise/entities/serviceList";

export function makeService(override: Partial<ServicesList> = {}, id?: UniqueEntityId) {
    return ServicesList.create({
        barbers: [new UniqueEntityId(randomUUID())],
        durationInMinutes: 30,
        name: 'cabelo',
        ...override
    }, id)
}