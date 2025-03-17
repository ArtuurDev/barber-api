export class FormatDateIncorrect   {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'Format date incorrect'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}