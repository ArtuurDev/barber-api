export class PhoneFormatIncorretly  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'The number of phone must have 11 digits '
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}