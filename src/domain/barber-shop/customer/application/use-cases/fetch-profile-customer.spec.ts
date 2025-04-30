import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryCustomerRepository } from "src/domain/test/repositories/in-memory-customer-repository";
import { makeCustomer } from "src/domain/test/factories/make-customer";
import { FetchProfileCustomerUseCase } from "./fetch-profile-customer";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Customer } from "../../enterprise/entities/customer";
import { Name } from "src/domain/value-objects/name";
import { IdNotExists } from "src/domain/errors/id-not-exists";

describe('List customers use case', () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository
  let sut: FetchProfileCustomerUseCase

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new FetchProfileCustomerUseCase(inMemoryCustomerRepository)
  })

  it('profile customer', async () => {
    
    inMemoryCustomerRepository.items.push(makeCustomer({fullName: new Name('luiz artur')}, new UniqueEntityId('1')))

    const result = await sut.execute({
        id: '1'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.customer).toBeInstanceOf(Customer)
    expect(result.value.customer).toEqual(expect.objectContaining({
        full_name: new Name('luiz artur')
    }))
  })

  it('id incorreto', async () => {

    inMemoryCustomerRepository.items.push(makeCustomer({fullName: new Name('luiz artur')}, new UniqueEntityId('1')))

    const result = await sut.execute({
        id: '2'
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toEqual(new IdNotExists())
  })
})
