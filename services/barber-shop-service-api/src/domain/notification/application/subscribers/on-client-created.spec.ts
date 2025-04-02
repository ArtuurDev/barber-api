import { describe, it, expect, beforeEach, vi } from "vitest";
import { OnClientCreated } from "./on-client-created";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { InMemoryNotificationRepository } from "services/barber-shop-service-api/test/repositories/in-memory-notification-repository";
import { waitFor } from "services/barber-shop-service-api/src/core/utils/awaitFor";
describe('on client Created', () => {

    let sut: SendNotificationUseCase
    let inMemoryNotificationRepository: InMemoryNotificationRepository

    beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
    new OnClientCreated(sut)

    })

    it('shoul send a notification when an client is created', async () => {
        const client = makeClient()
        const repository = new ClientInMemoryRepository()
        const sendNotificationUseCaseSpy = vi.spyOn(sut, 'execute')
        repository.create(client)
        await waitFor(() => {
            expect(sendNotificationUseCaseSpy).toHaveBeenCalled()
        })
    })

})