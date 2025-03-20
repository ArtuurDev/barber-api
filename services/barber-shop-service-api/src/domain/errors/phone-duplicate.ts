export class PhoneDuplicate  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'Phone duplicate'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}