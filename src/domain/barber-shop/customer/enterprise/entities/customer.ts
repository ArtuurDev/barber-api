import { Entity } from "../../../../../core/entitys/entity";
import { UniqueEntityId } from "../../../../../core/entitys/unique-entity-id";
import { Cpf } from "../../../../value-objects/cpf";
import { Email } from "../../../../value-objects/Email";
import { Name } from "../../../../value-objects/name";
import { NumberPhone } from "../../../../value-objects/number_phone";

export interface customerProps {
    full_name: Name
    email: Email
    cpf: Cpf
    numberPhone: NumberPhone
    birthDateAt: Date
    createdAt?: Date
    permission?: 'CLIENT'
    emailValidated?: boolean
    updatedAt?: Date | null  
}

export class Customer extends Entity<customerProps> {

    private constructor(props: customerProps, id?: UniqueEntityId ) {
        super(props, id ?? new UniqueEntityId())
    }

    static create(props: customerProps, id?: UniqueEntityId) {
        return new Customer({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            emailValidated: false,
            permission: props.permission ?? 'CLIENT',
        }, id)
    }

    get full_name() {
        return this.props.full_name
    }

    get cpf() {
        return this.props.cpf
    }

    get email() {
        return this.props.email
    }

    get permission() {
        return this.props.permission
    }

    get birtDateAt() {
        return this.props.birthDateAt
    }

    get emailValidated() {
        return this.props.emailValidated
    }

    get numberPhone() {
        return this.numberPhone
    }

}