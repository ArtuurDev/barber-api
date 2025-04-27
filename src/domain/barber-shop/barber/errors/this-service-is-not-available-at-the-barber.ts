export class ThisServiceIsNotAvailableAtTheBarber {
    private _code: number
    private _message: string
    constructor(code?: number, message?: string) {
        this._code = code ?? 400
        this._message = message ?? 'This service is not available at the barber'
    }

    get code() {
        return this._code
    }

    get message() {
        return this._message
    }

    toJson() {

        return {
            code: this.code,
            message: this.message
        }
    }
}