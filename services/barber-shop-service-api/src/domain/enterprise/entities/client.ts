import { Entity } from "../../../core/entitys/entity"
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id"
import { Optional } from "../../../core/types/optional"
import { formatEmail } from "../../../core/utils/email-formated"
import { formatCpf } from "../../../core/utils/formated-cpf"
import { formatPassord } from "../../../core/utils/formated-passord"
import { formatPhone } from "../../../core/utils/formated-phone"
import { EmailFormatIncorretly } from "../../errors/email-format-incorretly"
import { PasswordFormatIncorretly } from "../../errors/password-format-incorretly"
import { PhoneFormatIncorretly } from "../../errors/phone-format-incorretly"
import { UpdateClientUseCaseRequest } from "../../application/use-cases/update-client"

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


    static update(client: ClienteProps, updatedClientProps: Partial<UpdateClientUseCaseRequest>, clientId: string) {

        const {email,name,password,phone} = updatedClientProps

        if(email) {
            if(!formatEmail(email)) {
                throw new EmailFormatIncorretly()
            }
        }

        if(password) {
            if(!formatPassord(password)) {
                throw new PasswordFormatIncorretly()
            }
        }

        if(phone) {
            if(!formatPhone(phone)) {
                throw new PhoneFormatIncorretly()
            }
        }

        const clientUpdated = new Client({
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            birthDateAt: client.birthDateAt,
            phone: client.phone,
            password: client.password,
            createdAt: client.createdAt,
            updatedAt: new Date(),
            ...updatedClientProps
        }, 
        new UniqueEntityId(clientId)
    )
        return clientUpdated

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