import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository"
import { CreateClientUseCase } from "./create-client-use-case"
import { beforeEach, describe, expect, it } from "vitest"
import { PasswordHash } from "services/barber-shop-service-api/src/infra/database/repositories/cryptograpy-repository"
import { CpfFormatIncorretly } from "../../../errors/cpf-format-incorretly"
import { PhoneDuplicate } from "../../../errors/phone-duplicate"
import { EmailDuplicate } from "../../../errors/email-duplicate"
import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"
import { PasswordFormatIncorretly } from "../../../errors/password-format-incorretly"
import { CpfDuplicate } from "../../../errors/cpf-duplicate"

describe('Tests related to creating a client and value objects of Client', () => {
    let inMemoryClientRepository: ClientInMemoryRepository
    let sut: CreateClientUseCase
    let passordHash: PasswordHash

    beforeEach(() => {
        inMemoryClientRepository = new ClientInMemoryRepository()
        passordHash = new PasswordHash()
        sut = new CreateClientUseCase(inMemoryClientRepository, passordHash)
    })

    it('Should not be possible to register a customer with a duplicate CPF', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '88996036331',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(CpfDuplicate)
    })

    it('Should not be possible to register a customer with a duplicate phone', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '477.341.170-82',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.comm',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '(88) 99603-6330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(PhoneDuplicate)
    })

    it('Should not be possible to register a customer with a duplicate Email', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '477.341.170-82',
            phone: '88996036331',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(EmailDuplicate)
    })

    it('Should be able to create client', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: ['1']
        })
        expect(result.isRight()).toBe(true)
        expect(inMemoryClientRepository.items).length(1)
    })

    it('CPF inválido', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '24325344242.e',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(CpfFormatIncorretly)
    })

    it('Should not be possible to create a customer with a number that does not have 11 digits', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '8899603633',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(PhoneFormatIncorretly)
    })

    it('Should not be possible to create client with unformatted password', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '123456',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt: "2006-02-24",
            attachmentsIds: []
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(PasswordFormatIncorretly)
    })

})
