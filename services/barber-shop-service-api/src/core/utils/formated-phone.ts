import { PhoneFormatIncorretly } from "../../domain/errors/phone-format-incorretly"

export function formatPhone(phone: string) {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '')

    // Valida se o telefone tem exatamente 11 dígitos
    if (!/^\d{11}$/.test(cleaned)) {
        throw new PhoneFormatIncorretly()
    }

    return cleaned // Retorna o telefone apenas se for válido
}
