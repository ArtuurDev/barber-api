export class EmailFormatIncorretly  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'E-mail incorrect format'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}