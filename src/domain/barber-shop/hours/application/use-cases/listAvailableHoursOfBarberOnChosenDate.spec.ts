import { InMemoryHourRepository } from "src/domain/test/repositories/in-memory-hour-repository";
import { describe, expect } from "vitest";
import { beforeEach, it } from "vitest";
import { makeHour } from "src/domain/test/factories/make-hour";
import { InMemoryAppointmentRepository } from "src/domain/test/repositories/in-memory-appointments-repository";
import { InMemoryBarberRepository } from "src/domain/test/repositories/in-memory-barber-repository";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { makeAppointment } from "src/domain/test/factories/make-appointment";
import { DateVo } from "src/domain/value-objects/date";
import { makeBarber } from "src/domain/test/factories/make-barber";
import { ListAvailableHoursOfBarberOnChosenDateUseCase } from "./listAvailableHoursOfBarberOnChosenDate";

describe('tests related to list an hour', () => {
    let inMemoryHourRepository: InMemoryHourRepository
    let inMemoryAppointment: InMemoryAppointmentRepository
    let inMemoryBarberRepository: InMemoryBarberRepository
    let sut: ListAvailableHoursOfBarberOnChosenDateUseCase

    beforeEach(() => {
        inMemoryAppointment = new InMemoryAppointmentRepository()
        inMemoryBarberRepository = new InMemoryBarberRepository()
        inMemoryHourRepository = new InMemoryHourRepository(inMemoryAppointment)
        sut = new ListAvailableHoursOfBarberOnChosenDateUseCase(inMemoryHourRepository, inMemoryBarberRepository)
    })

    it('should be able to list hour', async () => {

        inMemoryHourRepository.items.push(makeHour({hour: '8:00'}, new UniqueEntityId('hour-1')))
        inMemoryHourRepository.items.push(makeHour({hour: '8:30'}, new UniqueEntityId('hour-2')))
        inMemoryHourRepository.items.push(makeHour({hour: '9:00'}, new UniqueEntityId('hour-3')))
        inMemoryHourRepository.items.push(makeHour({hour: '9:30'}, new UniqueEntityId('hour-4')))
        inMemoryHourRepository.items.push(makeHour({hour: '10:00'}, new UniqueEntityId('hour-5')))

        inMemoryBarberRepository.items.push(makeBarber({}, new UniqueEntityId('barber-1')))

        inMemoryAppointment.items.push(makeAppointment({
            appointmentDate: new DateVo('2025-04-10'),
            barberId: new UniqueEntityId('barber-1'),
            hours: [new UniqueEntityId('hour-1'), new UniqueEntityId('hour-2'), new UniqueEntityId('hour-3')],
        }))

        const result = await sut.execute({
            barberId: 'barber-1',
            dateAppointment: '2025-04-10'
        })
        expect(result.isRight()).toBe(true)
        expect(result.value.hours).toHaveLength(2)
        expect(result.value.hours).toEqual(['hour-4', 'hour-5'])
    })
    
})