export class CpfDuplicate  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'CPF inválido'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}