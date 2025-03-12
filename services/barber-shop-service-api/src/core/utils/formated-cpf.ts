export function formatCpf(cpf: string) {
    // Regex para validar o formato correto: XXX.XXX.XXX-XX
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    // Se não estiver no formato esperado, retorna null
    if (!cpfRegex.test(cpf)) {
        return null
    }

    return cpf
}
