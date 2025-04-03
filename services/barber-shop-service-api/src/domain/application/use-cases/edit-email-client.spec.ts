import { describe, it, beforeEach, expect } from "vitest";
import { EditEmailUseCase } from "./edit-email-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly";
import { ThisIsYourEmail } from "../../errors/this-is-your-email";

describe('tests related to email editing', () => {

    let sut: EditEmailUseCase
    let inMemoryClientRepsoitory: ClientInMemoryRepository

    beforeEach(() => {

        inMemoryClientRepsoitory = new ClientInMemoryRepository()
        sut = new EditEmailUseCase(inMemoryClientRepsoitory)

    })

    it('should be possible to update an email', async () => {

        const client = makeClient({
            _id: new UniqueEntityId("1"),
            email: 'arturcastro@gmail.com'
        })

        inMemoryClientRepsoitory.create(client)

        const result = await sut.execute({
            clientId: client._id.toValue,
            email: 'artursantos@gmail.com'
        })     

        expect(result.isRight()).toBe(true)
        expect(inMemoryClientRepsoitory.items[0].email).toEqual('artursantos@gmail.com')

    })

    it('when passing an existing email it should return an error', async () => {

        inMemoryClientRepsoitory.items.push(makeClient({
            email: 'arturcastro@gmail.com'
        }, new UniqueEntityId('1')))

        inMemoryClientRepsoitory.items.push(makeClient({
            email: 'artursantos@gmail.com'
        }, new UniqueEntityId('2')))

        const result = await sut.execute({
            clientId: '1',
            email: 'artursantos@gmail.com'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(EmailFormatIncorretly)
    })
   
    it('this your email', async () => {

        inMemoryClientRepsoitory.items.push(makeClient({
            email: 'arturcastro@gmail.com'
        }, new UniqueEntityId('1')))

        const result = await sut.execute({
            clientId: '1',
            email: 'arturcastro@gmail.com'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ThisIsYourEmail)

    })

})