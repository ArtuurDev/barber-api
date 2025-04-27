import { CustomerRepository } from "src/domain/barber-shop/customer/application/repositories/customer-repository"
import { AppointmentsRepository } from "../repositories/appointments-repository"
import { Either, left, right } from "src/core/either"
import { IdNotExists } from "src/domain/errors/id-not-exists"
import { Appointments } from "../../enterprise/entities/appointments"
import { BarberRepository } from "src/domain/barber-shop/barber/application/repositories/barber-repository"
import { IsBarberNotAvailableOnDateAndHours } from "src/domain/barber-shop/barber/errors/is-barber-not-available-on-date-and-hours"
import { UniqueEntityId } from "src/core/entitys/unique-entity-id"
import { DateVo } from "src/domain/value-objects/date"
import { ServiceListRepository } from "src/domain/barber-shop/servicesList/application/repositories/service-list-repository"
import { ThisServiceIsNotAvailableAtTheBarber } from "src/domain/barber-shop/barber/errors/this-service-is-not-available-at-the-barber"

export interface CreateAppointmentUseCaseRequest {
    customerId: string
    barberId: string
    appointmentDate: string
    services: string[]
    hours: string[]
    paymentMethod: 'cash' | 'credit_card' | 'debit'
    notes?: string
    totalPrice: number
}
export type CreateAppointmentUseCaseResponse = Either<
IdNotExists |
IsBarberNotAvailableOnDateAndHours,
{ appointment: Appointments }>

export class CreateAppointmentUseCase {
    constructor(
        private appointmentRepository: AppointmentsRepository,
        private customerRepository: CustomerRepository,
        private barberRepository: BarberRepository,
        private serviceListRepository: ServiceListRepository
    ) {}

    async execute({
        appointmentDate,
        barberId,
        customerId,
        hours,
        paymentMethod,
        services,
        totalPrice,
        notes
    }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
        // validando a data no formato aceito
        let appointmentDateTypeDate: DateVo
        try {
            appointmentDateTypeDate = new DateVo(appointmentDate)
        }
        catch(err) {
            return left(err)
        }

        const customer = await this.customerRepository.findById(customerId)
        if(!customer) {
            return left(new IdNotExists(400, 'This customerId does not exist'))
        }
        const barber = await this.barberRepository.findById(barberId)
        if(!barber) {
            return left(new IdNotExists(400, 'This barberId does not exist'))
        }

        // verificando se o barber contem os serviços escolhidos
        const servicesIsTheBarber = await this.serviceListRepository.verifyServicesBelongToBarber(services, barberId)

        if(!servicesIsTheBarber) {
            return left(new ThisServiceIsNotAvailableAtTheBarber())
        }

        // verificando se barbeiro está disponivel na data e hora selecionada
        const isBarberAvailableOnDateAndHour = await this.appointmentRepository.isBarberAvailableOnDateAndHour({
            appointmentDate: appointmentDateTypeDate,
            barberId,
            hours: hours.map(item => new UniqueEntityId(item))
        })
        
        if(!isBarberAvailableOnDateAndHour) {
            return left(new IsBarberNotAvailableOnDateAndHours())
        }

        try {
            // aqui eu chamaria um gateway de pagamento
            const appointment = Appointments.create({
                appointmentDate: appointmentDateTypeDate,
                barberId: new UniqueEntityId(barberId),
                customerId: new UniqueEntityId(customerId),
                hours: hours.map(hour => new UniqueEntityId(hour)),
                paymentMethod: paymentMethod,
                services: services.map(service => new UniqueEntityId(service)),
                totalPrice: totalPrice,
                notes: notes ?? null
            })
            await this.appointmentRepository.crete(appointment)
            return right({appointment})
        }
        catch(err) {
            return left(err)
        }
    } 

}