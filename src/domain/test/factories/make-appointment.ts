import { randomUUID } from "crypto";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Appointments } from "src/domain/barber-shop/appointments/enterprise/entities/appointments";
import { DateVo } from "src/domain/value-objects/date";

export function makeAppointment(override: Partial<Appointments>, id?: UniqueEntityId) {
    return Appointments.create({
        appointmentDate: new DateVo('2025-04-25'),
        barberId: new UniqueEntityId(randomUUID()),
        customerId: new UniqueEntityId(randomUUID()),
        hours: [new UniqueEntityId('hour-2'), new UniqueEntityId('3')],
        paymentMethod: 'cash',
        services: [new UniqueEntityId('service-1')],
        totalPrice: 100,
        ...override
    }, id)
}