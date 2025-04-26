import {beforeEach, describe, expect, it} from 'vitest'
import { CreateCustomerUseCase } from './create-customer.js'
import { InMemoryCustomerRepository } from '../../../../test/repositories/in-memory-customer-repository.js'
import { NameInvalid } from 'src/domain/errors/name-invalid.js'
import { EmailInvalid } from 'src/domain/errors/email-invalid.js'
import { NumberPhoneInvalid } from 'src/domain/errors/number_phone.js'
import { CpfInvalid } from 'src/domain/errors/cpf-ivalid.js'
import { DateInvalid } from 'src/domain/errors/date.js'

describe('customer creation testing section', () => {

    let inMemoryRepositoryCustomer: InMemoryCustomerRepository
    let sut: CreateCustomerUseCase

    beforeEach(()=> {
        inMemoryRepositoryCustomer = new InMemoryCustomerRepository()
        sut = new CreateCustomerUseCase(inMemoryRepositoryCustomer)
    })
    
    it('shoud be able can create an customer', async () => {
        const result = await sut.execute({
            birthDateAt: '2006-02-24',
            cpf: '62240847344',
            email: 'arturcastrodossantos.com@gmail.com',
            fullName: 'Luiz Artur Castro dos Santos',
            numberPhone: '88996036330',
        })
        expect(result.isRight()).toBe(true)
        expect(inMemoryRepositoryCustomer.items).toHaveLength(1)
    })

    it('should not be possible to create a customer with a poorly formatted name', async () => {
        const result = await sut.execute({
            birthDateAt: '2006-02-24',
            cpf: '62240847344',
            email: 'arturcastrodossantos.com@gmail.com',
            fullName: 'Luiz Artur Castro dos Santos   ',
            numberPhone: '88996036330',
        })
        expect(result.isRight()).toBe(false)
        expect(result.value).toEqual(new NameInvalid())
    })

    it('should not be possible to create a customer with a poorly formatted email', async () => {
        const result = await sut.execute({
            birthDateAt: '2006-02-24',
            cpf: '62240847344',
            email: 'arturcastrodossantos',
            fullName: 'Luiz Artur Castro dos Santos',
            numberPhone: '88996036330',
        })
        expect(result.isRight()).toBe(false)
        expect(result.value).toEqual(new EmailInvalid())
    })

    it('should not be possible to create a customer with a poorly formatted phone', async () => {
        const result = await sut.execute({
            birthDateAt: '2024-01-01',
            cpf: '62240847344',
            email: 'arturcastrodossantos@gmail.com',
            fullName: 'Luiz Artur Castro dos Santos',
            numberPhone: '88',
        })
        expect(result.isRight()).toBe(false)
        expect(result.value).toEqual(new NumberPhoneInvalid())
    })

    it('should not be possible to create a customer with a poorly formatted cpf', async () => {
        const result = await sut.execute({
            birthDateAt: '2006-02-24',
            cpf: '62',
            email: 'arturcastrodossantos@gmail.com',
            fullName: 'Luiz Artur Castro dos Santos',
            numberPhone: '88996036330',
        })
        expect(result.isRight()).toBe(false)
        expect(result.value).toEqual(new CpfInvalid())
    })

    it('should not be possible to create a customer with a poorly formatted birthDate', async () => {
        const result = await sut.execute({
            birthDateAt: '2006-02-40',
            cpf: '62240847344',
            email: 'arturcastrodossantos.com@gmail.com',
            fullName: 'Luiz Artur Castro dos Santos',
            numberPhone: '88996036330',
        })
        expect(result.isRight()).toBe(false)
        expect(result.value).toEqual(new DateInvalid())
    })
})