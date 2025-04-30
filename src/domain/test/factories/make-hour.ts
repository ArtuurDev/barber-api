import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Hours } from "src/domain/barber-shop/hours/enterprise/entities/hours";

export function makeHour(override: Partial<Hours> = {}, id?: UniqueEntityId) {

    return Hours.create({
        days: [0,1,2,3,4,5,6],
        hour: '8:00',
        active: true,
        ...override
    }, id)
}