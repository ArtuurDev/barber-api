import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Optional } from "src/core/types/optional";

export interface HoursProps {
    days: number[]
    hour: string
    active: boolean
}

export class Hours extends Entity<HoursProps> {
    
    private constructor(props: HoursProps, id?: UniqueEntityId ) {
        super(props, id)
    }

    static create(props: Optional<HoursProps, 'active'>, id?: UniqueEntityId) {
        return new Hours({
            ...props,
            active: props.active ?? true
        }, id ?? new UniqueEntityId())
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