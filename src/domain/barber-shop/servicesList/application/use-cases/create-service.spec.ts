import { describe, expect } from "vitest";
import { beforeEach, it } from "vitest";
import { CreateServiceUseCase } from "./create-service";
import { InMemoryServiceRepository } from "src/domain/test/repositories/in-memory-service-repository";

describe('tests related to create an hour', () => {
    let inMemoryServiceRepository: InMemoryServiceRepository
    let sut: CreateServiceUseCase

    beforeEach(() => {
        inMemoryServiceRepository = new InMemoryServiceRepository()
        sut = new CreateServiceUseCase(inMemoryServiceRepository)
    })

    it('should be able to create hour', async () => {

        const result = await sut.execute({
            barbers: ['1'],
            durationInMinutes: 30,
            name: 'Corte-Degradê'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryServiceRepository.items).toHaveLength(1)
    })
})