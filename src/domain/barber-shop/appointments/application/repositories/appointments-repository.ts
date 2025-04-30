import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Appointments } from "../../enterprise/entities/appointments";
import { DateVo } from "src/domain/value-objects/date";

export interface isBarberAvailableOnDateAndHourParams {
    barberId: string
    appointmentDate: DateVo
    hours: UniqueEntityId[]
}

export abstract class AppointmentsRepository {
    abstract create(appointment: Appointments): Promise<Appointments>
    abstract isBarberAvailableOnDateAndHour({appointmentDate,barberId,hours}: isBarberAvailableOnDateAndHourParams): Promise<boolean>
    abstract findMany(page?: number): Promise<Appointments[]>
}