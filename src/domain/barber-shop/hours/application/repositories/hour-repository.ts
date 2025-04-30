import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Hours } from "../../enterprise/entities/hours";
import { CalculateNumberIdsHoursAppointmentRequest } from "../use-cases/calculate-number-ids-hours-appointment";

export interface listAvailableHoursOfBarberOnChosenDate {
    barberId: string
    dateAppointment: string
}

export interface CalculateNumberIdsHoursAppointmentParams {
    hourInitialId: string
    hoursBarbersId: string[]
    serviceDuration: number

}

export abstract class HourRepository {
    abstract create(hour: Hours): Promise<any>
    abstract findMany(): Promise<Hours[]>
    abstract listAvailableHoursOfBarberOnChosenDate({ 
        barberId, 
        dateAppointment }: listAvailableHoursOfBarberOnChosenDate): Promise<string[]>
    abstract calculateNumberIdsHoursAppointment({ 
        hourInitialId, 
        hoursBarbersId, 
        serviceDuration}:CalculateNumberIdsHoursAppointmentParams): Promise<string[] | false>
}
