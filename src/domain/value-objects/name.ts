import { left } from "../../core/either"
import { NameInvalid } from "../errors/name-invalid"

export class Name {
    private _name: string

    constructor(name: string) {
        this.nameValidation(name)
        this._name = name
    }

    get name() {
        return this._name
    }

    nameValidation(name: string) {
        const regex = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ']+( [A-Za-zÀ-ÖØ-öø-ÿ']+)*$") // "João" "Ana Clara" "José d'Ávila" "Élise Dubois" "Óscar"
        if(!regex.test(name)) {
            throw new NameInvalid()
        }
        return name
    }
}