import { CustomerRepository } from "../../barber-shop/customer/application/repositories/customer-repository";
import { Customer } from "../../barber-shop/customer/enterprise/entities/customer";

export class InMemoryCustomerRepository implements CustomerRepository {
    

    public items: Customer[] = []

    async create(customer: Customer): Promise<Customer> {
        this.items.push(customer)
        return customer
    }

    async findById(id: string): Promise<Customer | undefined> {
        return this.items.find(item => item.id.toValue === id)
    }

    async findMany(page: number): Promise<Customer[]> {
        return this.items.slice((page - 1) * 5, page * 5)

    }

    async findByEmail(email: string): Promise<Customer | undefined> {
        return this.items.find(item => item.email.value === email)
    }

    async findByCpf(cpf: string): Promise<Customer | undefined> {
        return this.items.find(item => item.cpf.value === cpf)
    }
    
}