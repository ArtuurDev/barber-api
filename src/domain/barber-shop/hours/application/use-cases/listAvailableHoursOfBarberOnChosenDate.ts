import { Either, left, right } from "src/core/either"
import { HourRepository } from "../repositories/hour-repository"
import { IdNotExists } from "src/domain/errors/id-not-exists"
import { DateInvalid } from "src/domain/errors/date"
import { Hours } from "../../enterprise/entities/hours"
import { DateVo } from "src/domain/value-objects/date"
import { BarberRepository } from "src/domain/barber-shop/barber/application/repositories/barber-repository"

export interface ListAvailableHoursOfBarberOnChosenDateUseCaseRequest {
    barberId: string
    dateAppointment: string
}

export type ListAvailableHoursOfBarberOnChosenDateUseCaseResponse = Either<
IdNotExists | 
DateInvalid, {
    hours: Hours[]
}>

export class ListAvailableHoursOfBarberOnChosenDateUseCase {
    
    constructor(
        private hourRepository: HourRepository,
        private barberRepository: BarberRepository
    ) {}

    async execute({
        barberId, 
        dateAppointment}: ListAvailableHoursOfBarberOnChosenDateUseCaseRequest): Promise<ListAvailableHoursOfBarberOnChosenDateUseCaseResponse> {

        let date: DateVo
        try {
            date = new DateVo(dateAppointment)
        } 
        catch(err) {
                return left(err)
            }

        const barber = await this.barberRepository.findById(barberId)
        if(!barber) {
            return left(new IdNotExists())
        }
        const hours = await this.hourRepository.listAvailableHoursOfBarberOnChosenDate({
            barberId,
            dateAppointment: date.value
        })

        return right({
            hours
        })
    }
}