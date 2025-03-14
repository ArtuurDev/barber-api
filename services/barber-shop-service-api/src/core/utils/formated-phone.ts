import { PhoneFormatIncorretly } from "../../domain/errors/phone-format-incorretly"

export function formatPhone(phone: string) {
    // Expressão regular para validar o formato (XX) XXXXX-XXXX
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/

    if (phoneRegex.test(phone)) {
        return phone // Retorna o telefone se já estiver no formato correto
    }

    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '')

    // Valida se o telefone tem exatamente 11 dígitos
    if (/^\d{11}$/.test(cleaned)) {
        const formatPhone = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        return formatPhone
    }

    throw new PhoneFormatIncorretly() // Retorna null se o formato não for válido
}
