import { Entity } from "../../../core/entitys/entity"
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id"
import { Optional } from "../../../core/types/optional"
import { formatEmail } from "../../../core/utils/email-formated"
import { formatCpf } from "../../../core/utils/formated-cpf"
import { formatPassord } from "../../../core/utils/formated-passord"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"

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

        const client = new Client({
                ...props,
                password: formatPassord(props.password),
                email: formatEmail(props.email),
                cpf: formatCpf(props.cpf),
                phone: formatPhone(props.phone),
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

    get createdAt() {
        return this.props.createdAt
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