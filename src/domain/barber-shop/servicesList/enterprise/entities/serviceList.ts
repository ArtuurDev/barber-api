import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";

export interface ServicesListProps {
    name: string
    durationInMinutes: number
    experts: UniqueEntityId[]
}

export class servicesList extends Entity<ServicesListProps> {
    private constructor(props: ServicesListProps, id?: UniqueEntityId ) {
        super(props, id)
    }
}