import { Either, left, right } from "src/core/either"
import { IdNotExists } from "src/domain/errors/id-not-exists"
import { Customer } from "../../enterprise/entities/customer"
import { CustomerRepository } from "../repositories/customer-repository"

export interface FetchProfileCustomerUseCaseRequest {
    id: string
}

export type FetchProfileCustomerUseCaseResponse = Either<IdNotExists, {
    customer: Customer
}>

export class FetchProfileCustomerUseCase {
    constructor(
        private customerRepository: CustomerRepository
    ) {}


    async execute({ id }: FetchProfileCustomerUseCaseRequest): Promise<FetchProfileCustomerUseCaseResponse> {

        const customer = await this.customerRepository.findById(id)
        if(!customer) {
            return left(new IdNotExists())
        }

        return right({
            customer
        })

    }

    
}