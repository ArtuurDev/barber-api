import { DateVo } from "../../../../value-objects/date"
import { Either, left, right } from "../../../../../core/either"
import { CpfInvalid } from "../../../../errors/cpf-ivalid"
import { EmailInvalid } from "../../../../errors/email-invalid"
import { NameInvalid } from "../../../../errors/name-invalid"
import { Cpf } from "../../../../value-objects/cpf"
import { Email } from "../../../../value-objects/email"
import { Name } from "../../../../value-objects/name"
import { NumberPhone } from "../../../../value-objects/number_phone"
import { Customer } from "../../enterprise/entities/customer"
import { CustomerRepository } from "../repositories/customer-repository"
import { DateInvalid } from "@/domain/errors/date"

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
DateInvalid |
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
        
        try {
            const instanceCustomer = Customer.create({
                full_name: new Name(fullName),
                cpf: new Cpf(cpf),
                birthDateAt: new DateVo(birthDateAt),
                email: new Email(email),
                numberPhone: new NumberPhone(numberPhone),
                emailValidated: false,
            })

            await this.customerRepository.create(instanceCustomer)

            return right({
                instanceCustomer
            })
        } 
        catch(err) {
            return left(err)
        }
    }

}