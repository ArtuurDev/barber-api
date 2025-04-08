import { WatchedList } from "services/barber-shop-service-api/src/core/entitys/watched-list";
import { ClientAttachments } from "./client-attachments";

export class ClientAttachmentlist extends WatchedList<ClientAttachments> {
    compareItems(a: ClientAttachments, b: ClientAttachments): boolean {
        return a.attachmentId.equals(b.attachmentId)
    }

}