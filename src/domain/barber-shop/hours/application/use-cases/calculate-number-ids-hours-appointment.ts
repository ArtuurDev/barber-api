import { right } from "src/core/either"
import { HourRepository } from "../repositories/hour-repository"

export interface CalculateNumberIdsHoursAppointmentRequest {
    hourInitialId: string
    hoursBarbersId: string[]
    serviceDuration: number
}

export class CalculateNumberIdsHoursAppointment {
    
    constructor(
        private hoursRepository: HourRepository
    ) {}

    async execute({ 
        hourInitialId, 
        hoursBarbersId, 
        serviceDuration }: CalculateNumberIdsHoursAppointmentRequest) {

            const hours = await this.hoursRepository.calculateNumberIdsHoursAppointment({
                hourInitialId,
                hoursBarbersId,
                serviceDuration
            })
            return right({
                hours
            })
        
        }


}