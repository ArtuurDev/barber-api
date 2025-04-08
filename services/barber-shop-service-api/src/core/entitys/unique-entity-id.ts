import { randomUUID } from "crypto"

export class UniqueEntityId {

    private _value: string

    constructor(value?: string) {
        this._value = value ?? randomUUID()
    }

    get toValue() {
        return this._value
    }

    public equals(value: UniqueEntityId) {
        return value.toValue === this._value

    }
}
