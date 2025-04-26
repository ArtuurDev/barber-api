import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Optional } from "src/core/types/optional";
import { Cpf } from "src/domain/value-objects/cpf";
import { Email } from "src/domain/value-objects/email";
import { Name } from "src/domain/value-objects/name";
import { NumberPhone } from "src/domain/value-objects/number_phone";

export interface BarberProps {
    name: Name
    email: Email
    cpf: Cpf
    numberPhone: NumberPhone
    servicesList: UniqueEntityId[]
    bio?: string // Pequena descrição sobre o barbeiro
    avatarUrl?: string | null // Foto de perfil
    isActive?: boolean // Ativo no sistema
    availableDays?: number[] // Dias da semana que trabalha (ex: ['0', '1'])
    createdAt: Date
    updatedAt?: Date | null
}
export class Barber extends Entity<BarberProps> {


    static create(props: Optional<BarberProps, 'createdAt' | 'avatarUrl'>, id?: UniqueEntityId) {
        return new Barber({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            avatarUrl: props.avatarUrl ?? null
        }, id)
    }

    get name(): Name {
        return this.props.name
    }
    get email(): Email {
        return this.props.email
    }
    get cpf(): Cpf {
        return this.props.cpf
    }
    get numberPhone() {
        return this.props.numberPhone
    }
    get servicesList() {
        return this.props.servicesList
    }
    get bio() {
        return this.props.bio
    }
    get avatarUrl() {
        return this.props.avatarUrl
    }
    get isActive() {
        return this.props.isActive
    }  
    get availableDays() {
        return this.props.availableDays
    }    
    get createdAt() {
        return this.props.createdAt!
    }
    get updatedAt() {
        return this.props.updatedAt
    }    
}