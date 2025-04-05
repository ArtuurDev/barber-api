import { beforeEach, describe, expect, it } from "vitest";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { EditAttachmentClientUseCase } from "./edit-attachment-client";
import { InMemoryClientAttachmentsRepository } from "services/barber-shop-service-api/test/repositories/client-attachment-repository";
import { ClientAttachments } from "../../enterprise/entities/client-attachments";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";

describe('Tests an list clients', () => {

    let clientInMemoryRepository: ClientInMemoryRepository
    let inMemoryClientAttachmentsRepository: InMemoryClientAttachmentsRepository
    let sut: EditAttachmentClientUseCase

    beforeEach(() => {
        clientInMemoryRepository = new ClientInMemoryRepository()
        inMemoryClientAttachmentsRepository = new InMemoryClientAttachmentsRepository()
        sut = new EditAttachmentClientUseCase(clientInMemoryRepository, inMemoryClientAttachmentsRepository)
    })

    it('Shoud be able to edit clientsAttachments', async() => {

        const client = makeClient()
        clientInMemoryRepository.create(client)

        const attachment1 = ClientAttachments.create({
            attachmentId: new UniqueEntityId('1'),
            clientId: new UniqueEntityId(client._id.toValue)
        })
        const attachment2 = ClientAttachments.create({
            attachmentId: new UniqueEntityId('2'),
            clientId: new UniqueEntityId(client._id.toValue)
        })

        inMemoryClientAttachmentsRepository.items.push(attachment1)
        inMemoryClientAttachmentsRepository.items.push(attachment2)

        const result = await sut.execute({
            attachmentsIds: ['1', '2', '4'],
            clientId: client._id.toValue
        })

        expect(clientInMemoryRepository.items[0].attachments.currentItems).toHaveLength(3)
    })

} )