export function formatPassord(passord: string) {

    if(passord.length < 6) {
        return null
    }
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$')
    if(!regex.test(passord)) {
        return null
    }
    return passord

}