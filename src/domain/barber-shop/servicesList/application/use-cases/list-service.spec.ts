import { describe, expect } from "vitest";
import { beforeEach, it } from "vitest";
import { ListServiceUseCase } from "./list-service";
import { InMemoryServiceRepository } from "src/domain/test/repositories/in-memory-service-repository";
import { makeService } from "src/domain/test/factories/make-service";

describe('tests related to create an hour', () => {
    let inMemoryServiceRepository: InMemoryServiceRepository
    let sut: ListServiceUseCase

    beforeEach(() => {
        inMemoryServiceRepository = new InMemoryServiceRepository()
        sut = new ListServiceUseCase(inMemoryServiceRepository)
    })

    it('should be able to list hour', async () => {

        inMemoryServiceRepository.items.push(makeService({}))
        inMemoryServiceRepository.items.push(makeService({}))
        inMemoryServiceRepository.items.push(makeService({}))

        const result = await sut.execute()

        expect(result.isRight()).toBe(true)
        expect(inMemoryServiceRepository.items).toHaveLength(3)
    })
})