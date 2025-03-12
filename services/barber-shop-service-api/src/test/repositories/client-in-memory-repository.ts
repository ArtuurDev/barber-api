import { ClientRepository } from "../../domain/application/repositories/client-repositorie"
import { Client } from "../../domain/enterprise/entities/client"

export class ClientInMemoryRepository implements ClientRepository{

    public items: Client[] = [] 

    async create(client: Client): Promise<any>  {
    
        return this.items.push(client)
    }

    async find(): Promise<Client[] | []> {
        const clients = this.items
        return clients
    }

    async findById(id: string): Promise<Client | undefined> {
        
        const client = this.items.find(item => item.id.toValue === id)
        return client
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        
        const isValidatedCpf = this.items.find(item => item.props.email === email) 
        return isValidatedCpf

    }

    async findByCpf(cpf: string): Promise<Client | undefined> {
        
        const isValidatedCpf = this.items.find(item => item.props.cpf === cpf) 
        return isValidatedCpf
    }

    async delete(id: string): Promise<Client | undefined> {
        
        const index = this.items.findIndex(item => item.id.toValue === id)

        const itemRemoved = this.items.splice(index, 1)
        
        return itemRemoved[0]

    }
}