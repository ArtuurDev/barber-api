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

describe('tests related to appointments', () => {

    let inMemoryAppointmentRepository: InMemoryAppointmentRepository
    let inMemoryBarberRepository: InMemoryBarberRepository
    let inMemoryCustomerRepository: InMemoryCustomerRepository
    let sut: CreateAppointmentUseCase

    beforeEach(() => {
        inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
        inMemoryBarberRepository = new InMemoryBarberRepository(inMemoryAppointmentRepository)
        inMemoryCustomerRepository = new InMemoryCustomerRepository()

        sut = new CreateAppointmentUseCase(
        inMemoryAppointmentRepository, 
        inMemoryCustomerRepository, 
        inMemoryBarberRepository
    )
    })

    it('should be possible to create on appointment', async () => {

        const barber = makeBarber({}, new UniqueEntityId('1'))
        const customer = makeCustomer({}, new UniqueEntityId('1'))
        inMemoryBarberRepository.items.push(barber)
        inMemoryCustomerRepository.items.push(customer)

        const result = await sut.execute({
            appointmentDate: '2025-04-25',
            barberId: barber.id.toValue,
            customerId: customer.id.toValue,
            hours: ['10', '11'],
            paymentMethod: 'cash',
            services: ['4', '7'],
            totalPrice: 100.00,
            notes: 'Quero que seja rápido'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAppointmentRepository.items).toHaveLength(1)
    })
    
    it('It may not be possible to schedule an appointment on the chosen date and barber if the times are busy', async () => {
        const barber = makeBarber({}, new UniqueEntityId('barber-1'))
        const customer = makeCustomer({}, new UniqueEntityId('customer-1'))

        const appointment = makeAppointment({
            appointmentDate: new DateVo('2025-04-25'),
            barberId: new UniqueEntityId(barber.id.toValue),
            customerId: new UniqueEntityId(customer.id.toValue),
            hours: [new UniqueEntityId('hour-1'), new UniqueEntityId('hour-2')]
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

})