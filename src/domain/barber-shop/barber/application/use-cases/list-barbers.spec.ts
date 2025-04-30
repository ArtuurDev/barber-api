import { InMemoryBarberRepository } from "src/domain/test/repositories/in-memory-barber-repository";
import { describe, expect, it } from "vitest";
import { ListBarbersUseCase } from "./list-barbers";
import { beforeEach } from "vitest";
import { makeBarber } from "src/domain/test/factories/make-barber";

describe('tests related to get barbers', () => {

    let inMemoryBarberRepository: InMemoryBarberRepository
    let sut: ListBarbersUseCase

    beforeEach(() => {
        inMemoryBarberRepository = new InMemoryBarberRepository()
        sut = new ListBarbersUseCase(inMemoryBarberRepository)
    })

    it('should be able to list all barbers', async () => {

        inMemoryBarberRepository.items.push(makeBarber())
        inMemoryBarberRepository.items.push(makeBarber())
        inMemoryBarberRepository.items.push(makeBarber())

        const result = await sut.execute()

        expect(result.isRight()).toBe(true)
        expect(result.value.barbers).length(3)

    })

})