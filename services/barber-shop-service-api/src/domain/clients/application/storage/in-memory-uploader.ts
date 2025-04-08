import { randomUUID } from "node:crypto";
import { Uploader, UploadParams } from "./uploader.repository";

interface UploadReq {
    fileName: string
    url: string
}

export class InMemoryUploader implements Uploader {

    public uploaders: UploadReq[] = []

    async upload({fileName}: UploadParams): Promise<{ url: string; }> {
        const url = randomUUID()

        const upload = this.uploaders.push({
            fileName,
            url
        })
        return {
            url
        }
    }

}