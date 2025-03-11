export class CpfFormatIncorretly {
    code: number
    message: string
    constructor(code?:number, message?:string) {
        this.code = code ?? 400
        this.message = message ?? 'CPF must have 11 digits'
    }

    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }

}