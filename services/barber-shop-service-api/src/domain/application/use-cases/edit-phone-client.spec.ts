import { beforeEach, describe, expect, it } from "vitest";
import { EditPhoneUseCase } from "./edit-phone-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { PhoneDuplicate } from "../../errors/phone-duplicate";
import { ThisIsYourPhone } from "../../errors/this-is-your-phone";
import { IdNotExists } from "../../errors/id-not-exists";

describe('tests related to phone edition', () => {

    let inMemoryCLientRepository: ClientInMemoryRepository
    let sut: EditPhoneUseCase

    beforeEach(() => {

        inMemoryCLientRepository = new ClientInMemoryRepository()
        sut = new EditPhoneUseCase(inMemoryCLientRepository)

    })
    
    it('shold be able edit an phone', async() => {

        inMemoryCLientRepository.create(makeClient({}, new UniqueEntityId('1')))

        const result = await sut.execute({
            clientId: '1',
            phone: '85992546331'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryCLientRepository.items[0].phone).toEqual('85992546331')

    })
    it('not shold be able edit an phone id incorrectly', async() => {

        inMemoryCLientRepository.create(makeClient({}, new UniqueEntityId('1')))

        const result = await sut.execute({
            clientId: '2',
            phone: '85992546331'
        })

        expect(result.isRight()).toBe(false)
        expect(result.value).toBeInstanceOf(IdNotExists)


    })
    it('should not be able edit an phone duplicated', async() => {

        inMemoryCLientRepository.create(makeClient({phone: '85992546331'}, new UniqueEntityId('1')))
        inMemoryCLientRepository.create(makeClient({}, new UniqueEntityId('2')))

        const result = await sut.execute({
            clientId: '2',
            phone: '85992546331'
        })

        expect(result.isRight()).toBe(false)
        expect(result.value).toBeInstanceOf(PhoneDuplicate)
    })
    it('should not be able edit an phone duplicated', async() => {

        inMemoryCLientRepository.create(makeClient({phone: '85992546331'}, new UniqueEntityId('1')))

        const result = await sut.execute({
            clientId: '1',
            phone: '85992546331'
        })

        expect(result.isRight()).toBe(false)
        expect(result.value).toBeInstanceOf(ThisIsYourPhone)
    })

})