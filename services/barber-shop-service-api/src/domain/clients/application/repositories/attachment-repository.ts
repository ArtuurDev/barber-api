import { Attachments } from "../../enterprise/entities/attachments";

export abstract class AttachmentRepository{
    abstract create(attachment: Attachments): Promise<Attachments>
}