export class ThisIsYourPassword {
    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'The is your password, please insert outher'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}