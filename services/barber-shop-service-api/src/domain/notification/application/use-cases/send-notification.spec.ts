import { InMemoryNotificationRepository } from "services/barber-shop-service-api/test/repositories/in-memory-notification-repository";
import { test, expect } from "vitest";
import { SendNotificationUseCase } from "./send-notification";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";

test('', async ()=> {

    const inMemoryNotification = new InMemoryNotificationRepository()
    const sut = new SendNotificationUseCase(inMemoryNotification)


    const result = await sut.execute({
        content: 'new content',
        title: 'new title',
        recipientId: new UniqueEntityId('1')

    })
    expect(result.isRight()).toBe(true)

})