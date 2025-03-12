import { Entity } from "../../../core/entitys/entity"
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id"
import { Optional } from "../../../core/types/optional"
import { isValidEmail } from "../../../core/utils/email-formated"
import { formatCpf } from "../../../core/utils/formated-cpf"
import { formatPassord } from "../../../core/utils/formated-passord"
import { formatPhone } from "../../../core/utils/formated-phone"
import { CpfFormatIncorretly } from "../../../errors/cpf-format-incorretly"
import { EmailFormatIncorretly } from "../../../errors/email-format-incorretly"
import { PasswordFormatIncorretly } from "../../../errors/password-format-incorretly"
import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"

export interface ClienteProps {
    name: string
    email: string
    password: string
    cpf: string
    phone: string
    birthDateAt: Date
    createdAt: Date
    updatedAt?: Date
}

export class Client extends Entity<ClienteProps> {

    private constructor(props: ClienteProps, id?: UniqueEntityId) {
        super(props, id)
    }

    static create(props: Optional<ClienteProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId ) {

        const formattedCpf = formatCpf(props.cpf)
        if(!formattedCpf) {
            throw new CpfFormatIncorretly()
        }

        const formatedEmail = isValidEmail(props.email) 
        if(!formatedEmail) {
            throw new EmailFormatIncorretly()
        }

        const formattedPassword = formatPassord(props.password)
        if(!formattedPassword) {
            throw new PasswordFormatIncorretly()
        }

        const formattedPhone = formatPhone(props.phone)
        if(!formattedPhone) {
            throw new PhoneFormatIncorretly()
        }

        const client = new Client({
                ...props,
                cpf: formattedCpf,
                phone: formattedPhone,
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt
            }, id ?? new UniqueEntityId())
            return client
    }

    get phone() {
       return this.props.phone
    }

    set phone(phone: string) {
       
        const formated = formatPhone(phone)
        if(!formated) {
            throw new PhoneFormatIncorretly()
        }
        this.props.phone = formated
        this.props.updatedAt = new Date()
       }

    get password() {
        return this.props.password
    }

    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get birthDateAt() {
        return this.props.birthDateAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get cpf() {
        return this.props.cpf
    }
}