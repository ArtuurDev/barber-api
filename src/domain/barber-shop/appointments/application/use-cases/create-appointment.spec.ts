import { InMemoryAppointmentRepository } from "src/domain/test/repositories/in-memory-appointments-repository";
import { InMemoryBarberRepository } from "src/domain/test/repositories/in-memory-barber-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAppointmentUseCase } from "./create-appointment";
import { InMemoryCustomerRepository } from "src/domain/test/repositories/in-memory-customer-repository";
import { makeBarber } from "src/domain/test/factories/make-barber";
import { makeCustomer } from "src/domain/test/factories/make-customer";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { makeAppointment } from "src/domain/test/factories/make-appointment";
import { DateVo } from "src/domain/value-objects/date";
import { IsBarberNotAvailableOnDateAndHours } from "src/domain/barber-shop/barber/errors/is-barber-not-available-on-date-and-hours";
import { InMemoryServiceRepository } from "src/domain/test/repositories/in-memory-service-repository";
import { makeService } from "src/domain/test/factories/make-service";
import { ThisServiceIsNotAvailableAtTheBarber } from "src/domain/barber-shop/barber/errors/this-service-is-not-available-at-the-barber";
import { ListAvailableHoursOfBarberOnChosenDateUseCase } from "src/domain/barber-shop/hours/application/use-cases/listAvailableHoursOfBarberOnChosenDate";
import { InMemoryHourRepository } from "src/domain/test/repositories/in-memory-hour-repository";
import { CalculateNumberIdsHoursAppointment } from "src/domain/barber-shop/hours/application/use-cases/calculate-number-ids-hours-appointment";
import { makeHour } from "src/domain/test/factories/make-hour";

describe('tests related to appointments', () => {

    let inMemoryAppointmentRepository: InMemoryAppointmentRepository
    let listAvailableHoursOfBarberOnChosenDate: ListAvailableHoursOfBarberOnChosenDateUseCase
    let inMemoryHourRepository: InMemoryHourRepository
    let calculateNumberIdsHoursAppointments: CalculateNumberIdsHoursAppointment
    let inMemoryBarberRepository: InMemoryBarberRepository
    let inMemoryCustomerRepository: InMemoryCustomerRepository
    let inMemoryServiceRepository: InMemoryServiceRepository

    let sut: CreateAppointmentUseCase

    beforeEach(() => {
        inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
        inMemoryBarberRepository = new InMemoryBarberRepository()
        inMemoryHourRepository = new InMemoryHourRepository(inMemoryAppointmentRepository)
        calculateNumberIdsHoursAppointments = new CalculateNumberIdsHoursAppointment(inMemoryHourRepository)
        listAvailableHoursOfBarberOnChosenDate = new ListAvailableHoursOfBarberOnChosenDateUseCase(inMemoryHourRepository, inMemoryBarberRepository)
        inMemoryCustomerRepository = new InMemoryCustomerRepository()
        inMemoryServiceRepository = new InMemoryServiceRepository()

        sut = new CreateAppointmentUseCase(
        inMemoryAppointmentRepository, 
        inMemoryCustomerRepository, 
        inMemoryBarberRepository,
        inMemoryServiceRepository
    )
    })

    it('Deve ser possivel realizar um agendamento com um fluxo completo', async () => {

        const barber = makeBarber({}, new UniqueEntityId('barber-1'))
        const customer = makeCustomer({}, new UniqueEntityId('customer-1'))
        const service = makeService({
            barbers: [new UniqueEntityId(barber.id.toValue)],
        }, new UniqueEntityId('service-1'))

        inMemoryBarberRepository.items.push(barber)
        inMemoryCustomerRepository.items.push(customer)
        inMemoryServiceRepository.items.push(service)

        inMemoryHourRepository.items.push(makeHour({hour: '8:00'}, new UniqueEntityId('hour-1')))
        inMemoryHourRepository.items.push(makeHour({hour: '8:30'}, new UniqueEntityId('hour-2')))
        inMemoryHourRepository.items.push(makeHour({hour: '9:00'}, new UniqueEntityId('hour-3')))
        inMemoryHourRepository.items.push(makeHour({hour: '9:30'}, new UniqueEntityId('hour-4')))
        inMemoryHourRepository.items.push(makeHour({hour: '10:00'}, new UniqueEntityId('hour-5')))


        const horariosDisponiveis = await listAvailableHoursOfBarberOnChosenDate.execute({
            barberId: 'barber-1',
            dateAppointment: '2025-04-29'
        })
        expect(horariosDisponiveis.value.hours).toEqual(expect.objectContaining(['hour-1', 'hour-2', 'hour-3', 'hour-4', 'hour-5']))

        const horariosNecessarios = await calculateNumberIdsHoursAppointments.execute({
            hourInitialId: 'hour-1',
            serviceDuration: 90,
            hoursBarbersId: horariosDisponiveis.value.hours
        }) 
        expect(horariosNecessarios.value).toEqual(expect.objectContaining({hours: ['hour-1', 'hour-2', 'hour-3']}))

        const appointment = await sut.execute({
            appointmentDate: '2025-04-29',
            barberId: 'barber-1',
            customerId: 'customer-1',
            hours: horariosNecessarios.value.hours,
            services: [service.id.toValue],
            paymentMethod: 'cash',
            totalPrice: 50.00
        })

        expect(appointment.value.appointment).toEqual(expect.objectContaining({
            appointmentDate: new DateVo('2025-04-29'),
            barberId: new UniqueEntityId('barber-1'),
            hours: [new UniqueEntityId('hour-1'), new UniqueEntityId('hour-2'), new UniqueEntityId('hour-3')]
        }))
        
    })
    
    it('Não deve ser possível agendar um horário na data e no barbeiro escolhido se os horários estiverem ocupados', async () => {
        
        const barber = makeBarber({}, new UniqueEntityId('barber-1'))
        const customer = makeCustomer({}, new UniqueEntityId('customer-1'))
        const service = makeService({
            barbers: [new UniqueEntityId(barber.id.toValue)],
        }, new UniqueEntityId('service-1'))
        inMemoryServiceRepository.items.push(service)

        const appointment = makeAppointment({
            appointmentDate: new DateVo('2025-04-25'),
            barberId: new UniqueEntityId(barber.id.toValue),
            customerId: new UniqueEntityId(customer.id.toValue),
            hours: [new UniqueEntityId('hour-1'), new UniqueEntityId('hour-2')],
            services: [new UniqueEntityId(service.id.toValue)]
        }, new UniqueEntityId('1'))

        inMemoryAppointmentRepository.items.push(appointment)
        inMemoryBarberRepository.items.push(barber)
        inMemoryCustomerRepository.items.push(customer)

        const result = await sut.execute({
            appointmentDate: '2025-04-25',
            barberId: barber.id.toValue,
            customerId: customer.id.toValue,
            hours: ['hour-1', 'hour-2'],
            paymentMethod: 'cash',
            services: ['service-1'],
            totalPrice: 100
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual(new IsBarberNotAvailableOnDateAndHours())
    })

    it('Não deve ser possivel realizar um agendamento se os serviços escolhidos não forem fornecidos pelo o barbeiro escolhido', async () => {
        
        const barber = makeBarber({}, new UniqueEntityId('1'))
        const customer = makeCustomer({}, new UniqueEntityId('1'))
        const service = makeService({
            barbers: [new UniqueEntityId(barber.id.toValue)],
        }, new UniqueEntityId('service-1'))

        inMemoryBarberRepository.items.push(barber)
        inMemoryCustomerRepository.items.push(customer)
        inMemoryServiceRepository.items.push(service)

        const result = await sut.execute({
            appointmentDate: '2025-04-25',
            barberId: barber.id.toValue,
            customerId: customer.id.toValue,
            hours: ['10', '11'],
            paymentMethod: 'cash',
            services: ['SERVIÇO QUALQUER'],
            totalPrice: 100.00,
            notes: 'Quero que seja rápido'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual(new ThisServiceIsNotAvailableAtTheBarber())
    })

})