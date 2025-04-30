import { InMemoryHourRepository } from "src/domain/test/repositories/in-memory-hour-repository";
import { describe, expect } from "vitest";
import { CreateHoursUseCase } from "./create-hours";
import { beforeEach, it } from "vitest";

describe('tests related to create an hour', () => {
    let inMemoryHourRepository: InMemoryHourRepository
    let sut: CreateHoursUseCase

    beforeEach(() => {
        inMemoryHourRepository = new InMemoryHourRepository()
        sut = new CreateHoursUseCase(inMemoryHourRepository)
    })

    it('should be able to create hour', async () => {

        const result = await sut.execute({
            days: [0,1,2,3,4,5,6],
            hour: '8:00'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryHourRepository.items).toHaveLength(1)
    })
})