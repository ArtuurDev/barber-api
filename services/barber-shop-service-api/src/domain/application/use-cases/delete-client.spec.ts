import { beforeEach, describe, expect, it, test } from "vitest";
import { DeleteClientsUseCase } from "./delete-client";
import { ClientInMemoryRepository } from "../../../test/repositories/client-in-memory-repository";
import { makeClient } from "../../../test/factories/make-client";
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id";
import { IdNotExists } from "../../../errors/id-not-exists";

describe('tests related to the use case of deleting a client', () => {

    let clientInMemoryRepository: ClientInMemoryRepository
    let sut: DeleteClientsUseCase

    beforeEach(() => {
        clientInMemoryRepository = new ClientInMemoryRepository()
        sut = new DeleteClientsUseCase(clientInMemoryRepository)
    })


    it('Shoud be able delete to client', async () => {

        const client = makeClient({
            id: new UniqueEntityId()
        })
        clientInMemoryRepository.create(client)

        const result = await sut.execute({
            id: client.id.toValue
        })

        expect(result.isRight()).toBe(true)
        expect(clientInMemoryRepository.items).toHaveLength(0)
    })
    
    it('Shoud not be able to delete an client id incorrect', async () => {

        const client = makeClient({
            id: new UniqueEntityId()
        })
        clientInMemoryRepository.create(client)

        const result = await sut.execute({
            id: '1'
        })

        expect(result.isRight()).toBe(false)
        expect(result.value).toBeInstanceOf(IdNotExists)
    })

})