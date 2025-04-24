import { Either, left, right } from "../../../../../core/either"
import { CpfInvalid } from "../../../../errors/cpf-ivalid"
import { EmailInvalid } from "../../../../errors/email-invalid"
import { NameInvalid } from "../../../../errors/name-invalid"
import { Cpf } from "../../../../value-objects/cpf"
import { Email } from "../../../../value-objects/Email"
import { Name } from "../../../../value-objects/name"
import { NumberPhone } from "../../../../value-objects/number_phone"
import { Customer } from "../../enterprise/entities/customer"
import { CustomerRepository } from "../repositories/customer-repository"

export interface CreateCustomerUseCaseRequest {
    fullName: string
    email: string
    numberPhone: string
    cpf: string
    birthDateAt: string
    emailValideted?: boolean

}

type CreateCustomerUseCaseResponse = 
Either<
NameInvalid | 
EmailInvalid |
CpfInvalid,
{ instanceCustomer: Customer } >


export class CreateCustomerUseCase {

    constructor(
        private customerRepository: CustomerRepository
    ) {}

    async execute({
        birthDateAt,
        cpf,
        email,
        fullName,
        numberPhone,
    }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {


        const cpfAlreadyExists = await this.customerRepository.findByCpf(cpf)
        if(cpfAlreadyExists) {
            return left(new CpfInvalid())
        }

        const emailAlreadyExists = await this.customerRepository.findByEmail(email)
        if(emailAlreadyExists) {
            return left(new EmailInvalid(409, 'This E-mail already exists'))
        }

        const birthDate = new Date(birthDateAt)
        if (isNaN(birthDate.getTime())) {
        return left(new Error("Invalid birth date"))
        }
        
        try {
            const instanceCustomer = Customer.create({
                full_name: new Name(fullName),
                cpf: new Cpf(cpf),
                birthDateAt: new Date(birthDate),
                email: new Email(email),
                numberPhone: new NumberPhone(numberPhone),
                emailValidated: false,
            })
            return right({
                instanceCustomer
            })
        } 
        catch(err) {
            return left(err)
        }
    }

}