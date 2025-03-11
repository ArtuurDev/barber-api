export function formatedPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, '')
    if (/^\d{11}$/.test(cleaned)) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return null
}