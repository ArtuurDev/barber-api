import { beforeEach, describe, expect, it } from "vitest";
import { GetClientsUseCase } from "./get-clients";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";
import { InMemoryAttachmentsRepository } from "services/barber-shop-service-api/test/repositories/in-mememory-attachments-repository";
import { Uploader } from "../storage/uploader.repository";
import { InMemoryUploader } from "../storage/in-memory-uploader";
import { UploadAttachmentsUseCase } from "./upload-attachments";

describe('Tests an crete attachments', () => {

    let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository 
    let fakeUploader: InMemoryUploader
    let sut: UploadAttachmentsUseCase

    beforeEach(() => {
        inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
        fakeUploader = new InMemoryUploader()
        sut = new UploadAttachmentsUseCase(inMemoryAttachmentsRepository, fakeUploader)
    })

    it('Shoud be able to list clients', async() => {

        const result = await sut.execute({
            body: Buffer.from('1'),
            fileName: '1',
            fileType: 'image/png'
        })

        expect(result.value).toEqual({
            attachment: inMemoryAttachmentsRepository.items[0]
        })
        expect(fakeUploader.uploaders).toHaveLength(1)
    })

} )