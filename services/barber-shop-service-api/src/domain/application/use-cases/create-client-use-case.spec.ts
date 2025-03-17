import { beforeEach, describe, expect, it } from "vitest"
import { CreateClientUseCase } from "./create-client-use-case"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { CpfFormatIncorretly } from "../../errors/cpf-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { CpfDuplicate } from "../../errors/cpf-duplicate"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository"
import { FormatDateIncorrect } from "../../errors/format-date-incorrect"

describe('Tests related to creating a client and value objects of Client',  () => {
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
            birthDateAt: "2006-02-24"        
        })  

        const result2 = await sut.execute({
            name: 'artur',
            email: 'arturcastrodossantos.com@gmail.com',
            password: '1234Am@',
            cpf: '622.408.473-44',
            phone: '88996036330',
            birthDateAt:"2006-02-24"    
        })  

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(CpfDuplicate)

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
            cpf: '622.408.473-22',
            phone: '88996036330',
            birthDateAt: "2006-02-24"        
        })  

        expect(result2.isLeft()).toBe(true)
        expect(result2.value).toBeInstanceOf(EmailDuplicate)

    })

   it('Shoul be able to create client', async () => {

    const result = await sut.execute({
        name: 'artur',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '1234Am@',
        cpf: '622.408.473-44',
        phone: '88996036330',
        birthDateAt: "2006-02-24"        
    })  
    console.log(result.value)
    expect(result.isRight()).toBe(true)
    expect(inMemoryClientRepository.items).length(1)
   })

   it('CPF must XXX.XXX.XXX-XX', async () => {

    const result = await sut.execute({
        name: 'artur',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '1234Am@',
        cpf: '',      
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
   it('Not should be able an possible to create client can with password unformated', async () => {

    const result = await sut.execute({
        name: 'artur',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '123456',
        cpf: '622.408.473-44',      
        phone: '8899603633',
        birthDateAt:"2006-02-24"        
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PasswordFormatIncorretly)
   })
   it('Not should be able an possible to create client can with date unformated', async () => {

    const result = await sut.execute({
        name: 'artur',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '123456',
        cpf: '622.408.473-44',      
        phone: '8899603633',
        birthDateAt: '24-02-2006'        
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(FormatDateIncorrect)
   })

})