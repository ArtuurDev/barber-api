export class PasswordFormatIncorretly {
    code: number
    message: string
    constructor(code?:number, message?:string) {
        this.code = code ?? 400
        this.message = message ?? 'The password must have at least 6 characters between lowercase and uppercase letters and at least one special character'
    }

    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }

}