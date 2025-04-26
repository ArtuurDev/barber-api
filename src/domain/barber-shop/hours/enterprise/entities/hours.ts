import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";

export interface HoursEntity {
    days: number[]
    hour: string
    active: boolean
}

export class Hours extends Entity<HoursEntity> {
    
    private constructor(props: HoursEntity, id?: UniqueEntityId ) {
        super(props, id)
    }

    get days() {
        return this.props.days
    }
    get hour() {
        return this.props.hour
    }
    get active() {
        return this.props.active
    }
}