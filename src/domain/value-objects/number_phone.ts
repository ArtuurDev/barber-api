import { left } from "../../core/either"
import { NumberPhoneInvalid } from "../errors/number_phone"

export class NumberPhone {
    private _numberPhone: string

    constructor(numberPhone: string) {
        this.phoneValidation(numberPhone)
        this._numberPhone = numberPhone
    }

    get value() {
        return this._numberPhone
    }
    
    private phoneValidation(numberPhone: string) {
        const regex = /^\(?\d{2}\)?\s?(9\d{4}|\d{4})-?\d{4}$/

        if(!regex.test(numberPhone)) {
            throw new NumberPhoneInvalid()
        }
        
        return numberPhone
    }
}