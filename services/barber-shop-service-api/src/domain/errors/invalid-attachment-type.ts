export class InvalidAttachmentType  {

    code?: number 
    message: string

    constructor(message?:string, code?:number) {
        this.code = code ?? 400
        this.message = message ?? 'type is not valid'
    } 
    toJson() {
        return {
            code: this.code,
            message: this.message
        }
    }
}