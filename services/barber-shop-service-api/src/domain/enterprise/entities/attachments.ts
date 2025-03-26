import { Entity } from "services/barber-shop-service-api/src/core/entitys/entity";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";

export interface AttachmentsProps {
    title: string
    link: string
}
export class Attachments extends Entity<AttachmentsProps> {

    get attachmentId() {
        return this.props.title
    }

    get link() {
        return this.props.link
    }

    static create(props: AttachmentsProps, id?: UniqueEntityId) {
        return new Attachments(props, id)
    }

}