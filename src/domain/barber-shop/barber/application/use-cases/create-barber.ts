import { Either, Left, left, right } from "src/core/either"
import { EmailInvalid } from "src/domain/errors/email-invalid"
import { NameInvalid } from "src/domain/errors/name-invalid"
import { NumberPhoneInvalid } from "src/domain/errors/number_phone"
import { Barber } from "../../enterprise/entities/barber"
import { BarberRepository } from "../repositories/barber-repository"
import { CpfInvalid } from "src/domain/errors/cpf-ivalid"
import { Cpf } from "src/domain/value-objects/cpf"
import { Email } from "src/domain/value-objects/email"
import { Name } from "src/domain/value-objects/name"
import { NumberPhone } from "src/domain/value-objects/number_phone"
import { UniqueEntityId } from "src/core/entitys/unique-entity-id"

export interface CreateBarberUseCaseRequest {
    name: string
    email: string
    cpf: string
    numberPhone: string
    servicesList: string[]
    bio?: string
    avatarUrl?: string
    availableDays?: number[] 
}

export type CreateBarberUseCaseResponse = Either<EmailInvalid | 
NumberPhoneInvalid | 
NameInvalid, 
{
    barber: Barber
}>

export class CreateBarberUseCase {
    constructor(
        private barberRepository: BarberRepository
    ) {}

    async execute({ 
        cpf, 
        email, 
        name, 
        numberPhone, 
        servicesList, 
        availableDays, 
        avatarUrl, 
        bio }: CreateBarberUseCaseRequest) {

            const cpfIsNotValid = await this.barberRepository.findByCpf(cpf)
            if(cpfIsNotValid) {
                return left(new CpfInvalid())
            }
            const emailIsNotValid = await this.barberRepository.findByEmail(email)
            if(emailIsNotValid) {
                return left(new EmailInvalid())
            }
            const numberPhoneIsNotValid = await this.barberRepository.findByNumberPhone(numberPhone)
            if(numberPhoneIsNotValid) {
                return left(new NumberPhoneInvalid())
            }

            const barber = Barber.create({
                cpf: new Cpf(cpf),
                email: new Email(email),
                name: new Name(name),
                numberPhone: new NumberPhone(numberPhone),
                servicesList: servicesList.map(item => new UniqueEntityId(item)),
                availableDays,
                avatarUrl,
                bio
            })

            await this.barberRepository.create(barber)

            return right({
                barber
            })
    }
}   