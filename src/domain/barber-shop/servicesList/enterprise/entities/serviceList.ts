import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";

export interface ServicesListProps {
    name: string
    durationInMinutes: number
    barbers: UniqueEntityId[]
}

export class ServicesList extends Entity<ServicesListProps> {
    private constructor(props: ServicesListProps, id?: UniqueEntityId ) {
        super(props, id)
    }

    static create(props: ServicesListProps, id?: UniqueEntityId) {
        return new ServicesList({
            ...props
        }, id)
    }

    get name() {
        return this.props.name
    }
    get durationInMinutes() {
        return this.props.durationInMinutes
    }
    get barbers() {
        return this.props.barbers
    }
}