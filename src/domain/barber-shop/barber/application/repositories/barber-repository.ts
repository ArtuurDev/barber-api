import { DateVo } from "src/domain/value-objects/date";
import { Barber } from "../../enterprise/entities/barber";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";

export interface isBarberAvailableOnDateAndHourParams {
    barberId: string
    appointmentDate: DateVo
    hours: UniqueEntityId[]
}

export abstract class BarberRepository {
    abstract create(barber: Barber): Promise<any>
    abstract findById(barberId: string): Promise<Barber | undefined>
    abstract isBarberAvailableOnDateAndHour({appointmentDate,barberId,hours}: isBarberAvailableOnDateAndHourParams): Promise<boolean>
}