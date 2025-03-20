import { beforeEach, describe, expect, it } from "vitest";
import { GetClientsUseCase } from "./get-clients";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";

describe('Tests an list clients', () => {

    let clientInMemoryRepository: ClientInMemoryRepository
    let sut: GetClientsUseCase

    beforeEach(() => {
        clientInMemoryRepository = new ClientInMemoryRepository()
        sut = new GetClientsUseCase(clientInMemoryRepository)
    })

    it('Shoud be able to list clients', async() => {

        for(let i = 0; i < 3; i++) {
            clientInMemoryRepository.create(makeClient())
        }

        const result = await sut.execute()

        expect(result.isRight()).toBe(true)
        expect(clientInMemoryRepository.items).length(3)
        expect(result.value).toHaveLength(3)
    })

} )