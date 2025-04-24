import { left } from "../../core/either"
import { DateInvalid } from "../errors/date"

export class DateVo {
    private _date: Date

    constructor(date: string) {
        this.dateValidation(date)
        this._date = new Date(date)
    }

    get value() {
        return this._date
    }

    
    dateValidation(date: string) {
        const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/  
            // Primeiro verifica se o formato está correto
        if (!regex.test(date)) {
            throw new DateInvalid()
        }
        
        return date
    }
        
}
    
