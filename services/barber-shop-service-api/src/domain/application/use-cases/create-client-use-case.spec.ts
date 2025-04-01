import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository"
import { CreateClientUseCase } from "./create-client-use-case"
import { PhoneDuplicate } from "../../errors/phone-duplicate"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { CpfFormatIncorretly } from "../../errors/cpf-format-incorretly"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { FormatDateIncorrect } from "../../errors/format-date-incorrect"
import { beforeEach, describe, expect, it } from "vitest"

describe('Tests related to creating a client and value objects of Client', () => {
    let inMemoryClientRepository: ClientInMemoryRepository
    let sut: CreateClientUseCase

    beforeEach(() => {
        inMemoryClientRepository = new ClientInMemoryRepository()
        sut = new CreateClientUseCase(inMemoryClientRepository)
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
            birthDateAt: "2006-02-24"
        })

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(CpfFormatIncorretly)
    })

    it('Should not be possible to register a customer with a duplicate phone', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '477.341.170-82',
            phone: '88996036330',
            birthDateAt: "2006-02-24"
        })

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.comm',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '(88) 99603-6330',
            birthDateAt: "2006-02-24"
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
            birthDateAt: "2006-02-24"
        })

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '477.341.170-82',
            phone: '88996036331',
            birthDateAt: "2006-02-24"
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
            birthDateAt: "2006-02-24"
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
            birthDateAt: "2006-02-24"
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
            birthDateAt: "2006-02-24"
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(PasswordFormatIncorretly)
    })

    it('Should not be possible to create client with incorrectly formatted date', async () => {
        const result = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '123456',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt: '24-02-2006'
        })
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(FormatDateIncorrect)
    })
})
