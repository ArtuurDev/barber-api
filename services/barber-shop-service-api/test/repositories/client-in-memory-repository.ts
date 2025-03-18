import { ClientRepository } from "../../src/domain/application/repositories/client-repositorie"
import { Client } from "../../src/domain/enterprise/entities/client"

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

    async findByEmail(email: string): Promise<Client | null> {
        
        const client = this.items.find(item => item.email === email) 
        if(!client) {
            return null
        }
        return client

    }

    async findByPhone(phone: string): Promise<Client | null> {
        
        const client = this.items.find(item => item.phone === phone)

        if(!client) {
            return null
        }

        return client
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        
        const client = this.items.find(item => item.cpf === cpf) 
        if(!client) {
            return null
        }
        return client
    }

    async save(data: Client) {
        
        const index = this.items.findIndex(item => item._id.toValue === data._id.toValue) 
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