import { Either, left, right } from "services/barber-shop-service-api/src/core/either"
import { InvalidAttachmentType } from "../../../errors/invalid-attachment-type"
import { Attachments } from "../../enterprise/entities/attachments"
import { AttachmentRepository } from "../repositories/attachment-repository"
import { Uploader } from "../storage/uploader.repository"
import { Injectable } from "@nestjs/common"

interface UploadAttachmentsRequest {
    fileName: string
    fileType: string
    body: Buffer
}

type UploadAttachmentsResponse = Either<InvalidAttachmentType, Attachments>


@Injectable()
export class UploadAttachmentsUseCase {

    constructor(
        private readonly attachmentRepository: AttachmentRepository,
        private readonly uploader: Uploader
    ) {}

    async execute({body,fileName,fileType}: UploadAttachmentsRequest): Promise<UploadAttachmentsResponse> {

        if(!/^image\/(jpe?g|png)$/.test(fileType)) {
            return left(new InvalidAttachmentType())
        }

        const attachment = Attachments.create({
            title: fileName,
            url: ''
        })

        const {url} = await this.uploader.upload({
            fileName: fileName,
            body: body,
            fileType: fileType
        })

        attachment.url = url

        await this.attachmentRepository.create(attachment)
      

        return right({
            attachment
        })

    }

}