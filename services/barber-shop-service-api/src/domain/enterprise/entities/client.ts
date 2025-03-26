import { AggregateRoot } from "services/barber-shop-service-api/src/core/entitys/agregate-root"
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id"
import { Optional } from "../../../core/types/optional"
import { formatEmail } from "../../../core/utils/email-formated"
import { formatCpf } from "../../../core/utils/formated-cpf"
import { formatPassord } from "../../../core/utils/formated-passord"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { ClientAttachments } from "./client-attachments"

export interface ClienteProps {
    name: string
    email: string
    password: string
    attachments: ClientAttachments[]
    cpf: string
    phone: string
    birthDateAt: Date
    appointments_id: string[]
    createdAt: Date
    updatedAt?: Date

}
export class Client extends AggregateRoot<ClienteProps> {

    private constructor(props: ClienteProps, id?: UniqueEntityId) {
        super(props, id)
    }

    static create(props: Optional<ClienteProps, 'createdAt' | 'updatedAt' | 'attachments' | 'appointments_id'>, id?: UniqueEntityId ) {

        const client = new Client({
                ...props,
                appointments_id: props.appointments_id ?? [],
                attachments: props.attachments ?? [],
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

    get attachments() {
        return this.props.attachments
    }

    set attachments(attachments: ClientAttachments[]) {
        this.props.attachments = attachments
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