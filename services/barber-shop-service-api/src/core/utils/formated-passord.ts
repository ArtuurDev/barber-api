import { PasswordFormatIncorretly } from "../../domain/errors/password-format-incorretly"

export function formatPassord(passord: string) {

    if(passord.length < 6) {
        throw new PasswordFormatIncorretly()
    }
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$')
    if(!regex.test(passord)) {
        throw new PasswordFormatIncorretly()
    }
    return passord

}