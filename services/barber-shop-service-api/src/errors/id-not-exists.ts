export class IdNotExists {
    code: number
    message: string
    constructor(code?:number, message?:string) {
        this.code = code ?? 400
        this.message = message ?? 'This Id not exists'
    }

    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }

}