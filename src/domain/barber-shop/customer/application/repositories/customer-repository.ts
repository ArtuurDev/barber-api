import { Customer, customerProps } from "../../enterprise/entities/customer";

export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<Customer>
    abstract findById(id: string): Promise<Customer | undefined>
    abstract findByEmail(email: string): Promise<Customer | undefined>
    abstract findByCpf(cpf: string): Promise<Customer | undefined>
}