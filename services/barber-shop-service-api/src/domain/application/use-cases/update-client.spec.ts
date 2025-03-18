import { describe, expect, it } from "vitest"
import { UpdateClientUseCase } from "./update-client"
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { EmailDuplicate } from "../../errors/email-duplicate"
import { ThisIsYourEmail } from "../../errors/this-is-your-email"
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client"
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository"

describe("Test related to update Client", () => {

  it("Should be able to update client", async () => {
    const inMemoryClientRepository = new ClientInMemoryRepository()
    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient()
    inMemoryClientRepository.create(client)

    const result = await sut.execute(
      {
        name: "artur atual",
        password: "123456@As",
        phone: "88996036331",
      },
      
      client._id.toValue
    )

    expect(result.isRight()).toBe(true)

    expect(inMemoryClientRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "artur atual",
        password: "123456@As",
        phone: "88996036331",
      })
    )
  })

  it("Should not be able to update client email format incorrect", async () => {
    
    const inMemoryClientRepository = new ClientInMemoryRepository()

    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient()

    inMemoryClientRepository.create(client)

    const result = await sut.execute(
      {
        name: "artur atual",
        email: "f",
      },
      client._id.toValue
    )

    expect(result.isRight()).toBe(false)

    expect(result.value).toBeInstanceOf(EmailFormatIncorretly)

  })

  it("should not be possible to save the same email", async () => {
    
    const inMemoryClientRepository = new ClientInMemoryRepository()
    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient()
    const client2 = makeClient()

    inMemoryClientRepository.create(client)

    const result = await sut.execute(
      {
        email: "arturcastrodossantos.com@gmail.com",
      },
      client._id.toValue
    );

    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ThisIsYourEmail)
  })

  it("should not be possible to save email registred", async () => {
    
    const inMemoryClientRepository = new ClientInMemoryRepository()
    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient()
    const client2 = makeClient({
        email: 'angeloliveira@gmail.com'
    })
    inMemoryClientRepository.create(client)
    inMemoryClientRepository.create(client2)

    const result = await sut.execute(
      {
        email: "angeloliveira@gmail.com",
      },
      client._id.toValue
    )

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EmailDuplicate)
  })

  it("Should not be able to update client password format incorrect", async () => {

    const inMemoryClientRepository = new ClientInMemoryRepository()
    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient()
    inMemoryClientRepository.create(client)

    const result = await sut.execute(
      {
        name: "artur atual",
        password: "123456",
      },
      client._id.toValue
    )

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(PasswordFormatIncorretly);
  })

  it("Should not be able to update client phone format incorrect", async () => {
    
    const inMemoryClientRepository = new ClientInMemoryRepository()

    const sut = new UpdateClientUseCase(inMemoryClientRepository)

    const client = makeClient();
    inMemoryClientRepository.create(client);

    const result = await sut.execute(
      {
        name: "artur atual",
        phone: "38973..@@¨7687$6",
      },
      client._id.toValue
    );

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(PhoneFormatIncorretly);
  })
})
