export class AuthenticateError {
    code: number
    message: string
    constructor(code?:number, message?:string) {
        this.code = code ?? 409
        this.message = message ?? 'Email e/ou password incorreto'
    }

    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }

}