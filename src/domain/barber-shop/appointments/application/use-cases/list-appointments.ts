import { Either, right } from "src/core/either";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { Appointments } from "../../enterprise/entities/appointments";

export interface ListAppointmentsUseCaseRequest {
    page: number
}

export type ListAppointmentsUseCaseResponse = Either<null, {
    appointments: Appointments[]
}> 

export class ListAppointmentsUseCase {
    constructor(
        private appointmentRepository: AppointmentsRepository
    ) {}

    async execute({ page }: ListAppointmentsUseCaseRequest) {

        const appointments = await this.appointmentRepository.findMany(page)

        return right({
            appointments
        })

    }

}