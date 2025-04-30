import { InMemoryBarberRepository } from "src/domain/test/repositories/in-memory-barber-repository";
import { describe, expect, it } from "vitest";
import { CreateBarberUseCase } from "./create-barber";
import { beforeEach } from "vitest";

describe('Tests related to barber breeding', async () => {
    let inMemoryBarberRepository: InMemoryBarberRepository
    let sut: CreateBarberUseCase

    beforeEach(() => {
        inMemoryBarberRepository = new InMemoryBarberRepository()
        sut = new CreateBarberUseCase(inMemoryBarberRepository)
    })

    it('should be able to create an barber', async () => {

        const result = await sut.execute({
            cpf: '62240847344',
            email: 'arturcastrodossantos.com@gmail.com',
            name: 'Hudson amorin',
            numberPhone: '88996036330',
            servicesList: ['service-1', 'service-2'],
            availableDays: [0,1,2,3,4,5,6]
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryBarberRepository.items).toHaveLength(1)

    })

}) 