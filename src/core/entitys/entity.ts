import { UniqueEntityId } from "./unique-entity-id"

export class Entity<Props> {

    private _props: Props
    private _id: UniqueEntityId

    protected constructor(props: Props, id: UniqueEntityId) {
        this._props = props
        this._id = id ?? new UniqueEntityId()
    }

    get props() {
        return this._props
    }

    get id() {
        return this._id
    }

}