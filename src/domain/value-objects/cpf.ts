import { left } from "../../core/either";
import { CpfInvalid } from "../errors/cpf-ivalid";

export class Cpf {
    private _cpf: string
    constructor(cpf: string) {
        this.cpfValidation(cpf)
        this._cpf = cpf
    }

    get value() {
        return this._cpf
    }

    cpfValidation(cpf: string) {
            // Remove qualquer caractere que não seja número
            const cleaned = cpf.replace(/[^\d]/g, '')
          
            // Verifica se tem 11 dígitos e se todos os dígitos não são iguais
            if (!/^\d{11}$/.test(cleaned) || /^(\d)\1{10}$/.test(cleaned)) {
              throw new CpfInvalid()
            }
          
            // Validação do primeiro dígito verificador
            let sum = 0
            for (let i = 0; i < 9; i++) {
              sum += parseInt(cleaned.charAt(i)) * (10 - i)
            }
            let firstCheck = (sum * 10) % 11;
            if (firstCheck === 10 || firstCheck === 11) firstCheck = 0
            if (firstCheck !== parseInt(cleaned.charAt(9))) return false
          
            // Validação do segundo dígito verificador
            sum = 0;
            for (let i = 0; i < 10; i++) {
              sum += parseInt(cleaned.charAt(i)) * (11 - i)
            }
            let secondCheck = (sum * 10) % 11
            if (secondCheck === 10 || secondCheck === 11) secondCheck = 0
            if (secondCheck !== parseInt(cleaned.charAt(10))) return false
          
            return cpf
    }

}