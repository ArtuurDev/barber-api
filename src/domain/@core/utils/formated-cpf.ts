export function formatCpf(cpf: string) {
    const cpfClear = cpf.replace(/\D/g, '')

    if (cpfClear.length === 11) {
        const cpfFormated = cpfClear.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        return cpfFormated
    }
    return null
    
}
