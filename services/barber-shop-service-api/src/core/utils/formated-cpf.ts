import { CpfFormatIncorretly } from "../../domain/errors/cpf-format-incorretly";

export function formatCpf(cpf: string) {
    const cleanedCpf = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos ou se todos os dígitos são iguais
    if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) {
      throw new CpfFormatIncorretly();
    }
  
    // Função para calcular um dígito verificador
    const calculateDigit = (slice: string, weight: number) => {
      let sum = 0;
      for (let i = 0; i < slice.length; i++) {
        sum += parseInt(slice[i]) * (weight - i);
      }
      const remainder = (sum * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };
  
    // Calcula os dois dígitos verificadores
    const firstCheck = calculateDigit(cleanedCpf.slice(0, 9), 10);
    const secondCheck = calculateDigit(cleanedCpf.slice(0, 10), 11);
  
    // Valida os dígitos verificadores
    if (firstCheck !== parseInt(cleanedCpf[9]) || secondCheck !== parseInt(cleanedCpf[10])) {
      throw new CpfFormatIncorretly();
    }
  
    // Retorna o CPF limpo sem formatação
    return cleanedCpf;
}
