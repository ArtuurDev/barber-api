import { FormatDateIncorrect } from "../../domain/errors/format-date-incorrect";

export function formatDate(data: string) {
    // Expressão regular para validar o formato YYYY-MM-DD
    const regexData = /^\d{4}-\d{2}-\d{2}$/;

    if(!regexData.test(data)) {
        throw new FormatDateIncorrect()
    }
    return new Date(data)
}
