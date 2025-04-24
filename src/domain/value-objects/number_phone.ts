import { left } from "../../core/either"
import { NumberPhoneInvalid } from "../errors/number_phone"

export class NumberPhone {
    private _numberPhone: string

    constructor(numberPhone: string) {
        this.phoneValidation(numberPhone)
        this._numberPhone = numberPhone
    }

    get numberPhone() {
        return this._numberPhone
    }
    
    phoneValidation(numberPhone: string) {
        const regex = /^\(?\d{2}\)?\s?(9\d{4}|\d{4})-?\d{4}$/

        if(!regex.test(numberPhone)) {
            return left(new NumberPhoneInvalid())
        }
        
        return numberPhone
    }
}