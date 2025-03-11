import { UniqueEntityId } from "./unique-entity-id"

export abstract class Entity<Props> {

    private _props: Props
    private _id: UniqueEntityId

    constructor(props: Props, id?: UniqueEntityId ) {

        this._props = props
        this._id = id ?? new UniqueEntityId()
    }

    get id() {
        return this._id
    }

    get props() {
        return this._props
    }

}