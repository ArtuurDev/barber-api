import { InMemoryHourRepository } from "src/domain/test/repositories/in-memory-hour-repository";
import { describe, expect } from "vitest";
import { beforeEach, it } from "vitest";
import { ListHoursUseCase } from "./list-hours";
import { makeHour } from "src/domain/test/factories/make-hour";
import { InMemoryAppointmentRepository } from "src/domain/test/repositories/in-memory-appointments-repository";

describe('tests related to list an hour', () => {
    let inMemoryHourRepository: InMemoryHourRepository
    let inMemoryAppointment: InMemoryAppointmentRepository
    
    let sut: ListHoursUseCase

    beforeEach(() => {
        inMemoryAppointment = new InMemoryAppointmentRepository()
        inMemoryHourRepository = new InMemoryHourRepository(inMemoryAppointment)
        sut = new ListHoursUseCase(inMemoryHourRepository)
    })

    it('should be able to list hour', async () => {

        inMemoryHourRepository.items.push(makeHour({}))
        inMemoryHourRepository.items.push(makeHour({}))
        inMemoryHourRepository.items.push(makeHour({}))

        const result = await sut.execute()

        expect(result.isRight()).toBe(true)
        expect(inMemoryHourRepository.items).toHaveLength(3)
    })
})