import { beforeEach, describe, expect, it } from "vitest";
import { ClientInMemoryRepository } from "../../../test/repositories/client-in-memory-repository";
import { GetClientsUseCase } from "./get-clients";
import { makeClient } from "../../../test/factories/make-client";

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
        expect(result.value.clients).toHaveLength(3)
    })

} )