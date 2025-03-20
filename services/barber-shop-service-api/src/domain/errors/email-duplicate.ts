export class EmailDuplicate  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'This E-mail already exists'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}