import { Either, right } from "src/core/either"
import { Customer } from "../../enterprise/entities/customer"
import { CustomerRepository } from "../repositories/customer-repository"

export interface ListCustomerUseCaseRequest {
    page: number
}

export type ListCustomerUseCaseResponse = Either<null,
{
    customers: Customer[]
}>

export class ListcustomerUseCase {
    constructor(
        private customerRepository: CustomerRepository
    ) {}

    async execute({ page }: ListCustomerUseCaseRequest): Promise<ListCustomerUseCaseResponse> {

        const customers = await this.customerRepository.findMany(page)
        return right({
            customers
        })

    }

}