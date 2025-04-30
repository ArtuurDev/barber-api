import { InMemoryHourRepository } from "src/domain/test/repositories/in-memory-hour-repository";
import { describe, expect } from "vitest";
import { beforeEach, it } from "vitest";
import { makeHour } from "src/domain/test/factories/make-hour";
import { InMemoryAppointmentRepository } from "src/domain/test/repositories/in-memory-appointments-repository";
import { CalculateNumberIdsHoursAppointment } from "./calculate-number-ids-hours-appointment";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { makeAppointment } from "src/domain/test/factories/make-appointment";
import { InMemoryBarberRepository } from "src/domain/test/repositories/in-memory-barber-repository";
import { makeBarber } from "src/domain/test/factories/make-barber";
import { DateVo } from "src/domain/value-objects/date";
import { ListAvailableHoursOfBarberOnChosenDateUseCase } from "./listAvailableHoursOfBarberOnChosenDate";
import { makeService } from "src/domain/test/factories/make-service";
import { CreateAppointmentUseCase } from "src/domain/barber-shop/appointments/application/use-cases/create-appointment";

describe('tests related to list an hour', () => {
    let inMemoryHourRepository: InMemoryHourRepository
    let inMemoryAppointment: InMemoryAppointmentRepository
    let inMemoryBarberRepository: InMemoryBarberRepository
    let createAppointment: CreateAppointmentUseCase
    let listAvailableHoursOfBarberOnChosenDate: ListAvailableHoursOfBarberOnChosenDateUseCase
    
    let sut: CalculateNumberIdsHoursAppointment

    beforeEach(() => {
        inMemoryAppointment = new InMemoryAppointmentRepository()
        inMemoryBarberRepository = new InMemoryBarberRepository()
        
        inMemoryHourRepository = new InMemoryHourRepository(inMemoryAppointment)
        listAvailableHoursOfBarberOnChosenDate = new ListAvailableHoursOfBarberOnChosenDateUseCase(inMemoryHourRepository, inMemoryBarberRepository)
        sut = new CalculateNumberIdsHoursAppointment(inMemoryHourRepository)
    })

    it('should be able to list hour', async () => {

        inMemoryHourRepository.items.push(makeHour({}, new UniqueEntityId('hour-1')))
        inMemoryHourRepository.items.push(makeHour({}, new UniqueEntityId('hour-2')))
        inMemoryHourRepository.items.push(makeHour({}, new UniqueEntityId('hour-3')))
        inMemoryHourRepository.items.push(makeHour({}, new UniqueEntityId('hour-4')))
        inMemoryHourRepository.items.push(makeHour({}, new UniqueEntityId('hour-5')))
        
        inMemoryBarberRepository.items.push(makeBarber({}, new UniqueEntityId('barber-1')))

        inMemoryAppointment.items.push(makeAppointment({
            appointmentDate: new DateVo('2025-04-29'),
            barberId: new UniqueEntityId('barber-1'),
            hours: [new UniqueEntityId('hour-1'), new UniqueEntityId('hour-2')],
        }, new UniqueEntityId('appointment-1')))

        const {value} = await listAvailableHoursOfBarberOnChosenDate.execute({
            barberId: 'barber-1',
            dateAppointment: '2025-04-29'
        })

        expect(value.hours).toEqual(['hour-3', 'hour-4', 'hour-5']) // horarios disponiveis do barbeiro na data escolhida

        const service = makeService({
            durationInMinutes: 60
        }, new UniqueEntityId('service-1'))

        const result = await sut.execute({
            hourInitialId: 'hour-3',
            hoursBarbersId: value.hours,
            serviceDuration: service.durationInMinutes
        })

        expect(result.value.hours).toEqual(['hour-3', 'hour-4']) 
        // intervalos de hourarios para um agendamento de 60 minutos com base no horário inicial que foi escolhido
        // e na sua duração, esse metodo retorna uma lista com ids dos horarios necessarios para um agendamento após um calculo feito com a lista de 
        // horarios disponiveis
        // do barbeiro retornado pela função listAvailableHoursOfBarberOnChosenDate
    })
})