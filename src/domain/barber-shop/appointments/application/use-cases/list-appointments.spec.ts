import { describe, expect, it, beforeEach } from "vitest";
import { ListAppointmentsUseCase } from "./list-appointments";
import { InMemoryAppointmentRepository } from "src/domain/test/repositories/in-memory-appointments-repository";
import { makeAppointment } from "src/domain/test/factories/make-appointment";

describe('List customers use case', () => {
  let inMemoryAppointmentRepository: InMemoryAppointmentRepository
  let sut: ListAppointmentsUseCase

  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new ListAppointmentsUseCase(inMemoryAppointmentRepository)
  })

  it('should be able to list the first 20 customers from a total of 20', async () => {
    for (let i = 0; i < 20; i++) {
      inMemoryAppointmentRepository.items.push(makeAppointment({}))
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value.appointments).toHaveLength(20)
  })

  it('should return the correct customers for page 2', async () => {
    for (let i = 0; i < 21; i++) {
      inMemoryAppointmentRepository.items.push(makeAppointment({}))
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value.appointments).toHaveLength(1)
  })

  it('should return an empty list if page is out of range', async () => {
    for (let i = 0; i < 10; i++) {
      inMemoryAppointmentRepository.items.push(makeAppointment({}))
    }

    const result = await sut.execute({ page: 3 })

    expect(result.isRight()).toBe(true)
    expect(result.value.appointments).toHaveLength(0)
  })
})
