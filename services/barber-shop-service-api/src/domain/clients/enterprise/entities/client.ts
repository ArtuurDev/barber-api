import { AggregateRoot } from "services/barber-shop-service-api/src/core/entitys/agregate-root"
import { formatPhone } from "services/barber-shop-service-api/src/core/utils/formated-phone"
import { ClientAttachmentlist } from "./client-attachment-list"
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id"
import { Optional } from "@prisma/client/runtime/library"
import { formatEmail } from "services/barber-shop-service-api/src/core/utils/email-formated"
import { formatCpf } from "services/barber-shop-service-api/src/core/utils/formated-cpf"
import { PhoneFormatIncorretly } from "../../../errors/phone-format-incorretly"

export interface ClienteProps {
    name: string
    email: string
    password: string
    attachments: ClientAttachmentlist
    cpf: string
    phone: string
    emailValidated: boolean
    permission: 'CLIENT'
    birthDateAt: Date
    appointments_id: string[]
    createdAt: Date
    updatedAt?: Date

}
export class Client extends AggregateRoot<ClienteProps> {

    private constructor(props: ClienteProps, id?: UniqueEntityId) {
        super(props, id)
    }

    static create(props: Optional<ClienteProps, 'createdAt' | 'updatedAt' | 'attachments' | 'appointments_id' | 'emailValidated'>, id?: UniqueEntityId ) {

        const client = new Client({
                ...props,
                permission: 'CLIENT',
                appointments_id: props.appointments_id ?? [],
                attachments: props.attachments ?? new ClientAttachmentlist(),
                email: formatEmail(props.email),
                cpf: formatCpf(props.cpf),
                phone: formatPhone(props.phone),
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt,
                emailValidated: props.emailValidated ?? false
            }, id ?? new UniqueEntityId())

           return client
    }

    get phone() {
       return this.props.phone
    }
    get permission() {
        return this.props.permission
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

    set attachments(attachments: ClientAttachmentlist) {
        this.props.attachments = attachments
        this.props.updatedAt = new Date()
    }

    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get emailValidated() {
        return this.props.emailValidated
    }

    set emailValidated(value: boolean) {
        this.props.emailValidated = value
        this.props.updatedAt = new Date()
    }

    set email(email: string) {
        const emailIsValid = formatEmail(email)
        this.props.email = emailIsValid
        this.props.updatedAt = new Date()
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