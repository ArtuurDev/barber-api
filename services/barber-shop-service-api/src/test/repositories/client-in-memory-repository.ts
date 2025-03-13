import { UniqueEntityId } from "../../core/entitys/unique-entity-id"
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
        
        const client = this.items.find(item => item._id.toValue === id)
        return client
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        
        const isValidatedCpf = this.items.find(item => item.email === email) 
        return isValidatedCpf

    }

    async findByCpf(cpf: string): Promise<Client | undefined> {
        
        const isValidatedCpf = this.items.find(item => item.cpf === cpf) 
        return isValidatedCpf
    }

    async save(data: Client, id: string): Promise<Client | undefined> {
        
        const index = this.items.findIndex(item => item._id.toValue === id) 
        if(index === -1) {
            return undefined
        } 

        return this.items[index] = data

    }

    async delete(id: string): Promise<Client | undefined> {
        
        const index = this.items.findIndex(item => item._id.toValue === id)

        const itemRemoved = this.items.splice(index, 1)
        
        return itemRemoved[0]

    }
}