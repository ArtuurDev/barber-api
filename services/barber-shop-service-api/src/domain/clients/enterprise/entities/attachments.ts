import { Entity } from "services/barber-shop-service-api/src/core/entitys/entity";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";

export interface AttachmentsProps {
    title: string
    url: string
}


export class Attachments extends Entity<AttachmentsProps> {

    get title() {
        return this.props.title
    }

    get url() {
        return this.props.url
    }

    set url(url: string) {
        this.props.url = url
    }

    static create(props: AttachmentsProps, id?: UniqueEntityId) {
        return new Attachments(props, id)
    }

}