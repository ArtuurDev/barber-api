import {randomUUID} from 'node:crypto'
export class UniqueEntityId {

    private _value: string

    constructor(value?: string) {
        this._value = value ?? randomUUID()
    }

    get toValue() {
        return this._value
    }

}