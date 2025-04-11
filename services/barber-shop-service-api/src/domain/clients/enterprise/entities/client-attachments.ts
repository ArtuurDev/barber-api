import { Entity } from "services/barber-shop-service-api/src/core/entitys/entity";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";

export interface ClientAttachmentsProps {
    clientId: UniqueEntityId
    attachmentId: UniqueEntityId
}

export class ClientAttachments extends Entity<ClientAttachmentsProps> {

    get clientAttachmentsId() {
        return this.props.clientId
    }

    get attachmentId() {
        return this.props.attachmentId
    }

    static create(props: ClientAttachmentsProps, id?: UniqueEntityId) {

        return new ClientAttachments(props, id)

    }

}