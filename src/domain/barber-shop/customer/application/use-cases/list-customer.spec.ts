import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryCustomerRepository } from "src/domain/test/repositories/in-memory-customer-repository";
import { ListcustomerUseCase } from "./list-customers";
import { makeCustomer } from "src/domain/test/factories/make-customer";

describe('List customers use case', () => {
  let inMemoryCustomerRepository: InMemoryCustomerRepository
  let sut: ListcustomerUseCase

  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new ListcustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to list the first 5 customers from a total of 15', async () => {
    for (let i = 0; i < 15; i++) {
      inMemoryCustomerRepository.items.push(makeCustomer())
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value.customers).toHaveLength(5)
  })

  it('should return the correct customers for page 2', async () => {
    for (let i = 0; i < 15; i++) {
      inMemoryCustomerRepository.items.push(makeCustomer())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value.customers).toHaveLength(5)
  })

  it('should return an empty list if page is out of range', async () => {
    for (let i = 0; i < 10; i++) {
      inMemoryCustomerRepository.items.push(makeCustomer())
    }

    const result = await sut.execute({ page: 3 })

    expect(result.isRight()).toBe(true)
    expect(result.value.customers).toHaveLength(0)
  })
})
