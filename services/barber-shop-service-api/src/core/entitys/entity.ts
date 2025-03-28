import { UniqueEntityId } from "./unique-entity-id"

export abstract class Entity<Props> {

    protected props: Props
    private id: UniqueEntityId

    get _id() {
        return this.id
    }

    
    protected constructor(props: any, id?: UniqueEntityId ) {

        this.props = props
        this.id = id ?? new UniqueEntityId()
    }

    public equals(entity: Entity<any>) {
        if(entity === this) {
            return true
        }

        if(entity._id === entity._id) {
            return true
        }
    }

}