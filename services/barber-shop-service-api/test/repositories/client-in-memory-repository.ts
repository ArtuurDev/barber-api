import { DomainEvents } from "services/barber-shop-service-api/src/core/events/domain-events"

import { Client as PrismaClient } from "@prisma/client";
import { ClientRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-repositorie";
import { Client } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client";

export class ClientInMemoryRepository implements ClientRepository{
    async authenticate(email: string): Promise<PrismaClient | null> {
        throw new Error("Method not implemented.")
    }
    
    findByPassword(password: string, id: string): Promise<Client | null> {
        throw new Error("Method not implemented.")
    }


    public items: Client[] = [] 

    async create(client: Client): Promise<any>  {
    
        this.items.push(client)
        DomainEvents.dispatchEventsForAggregate(client._id)
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

    async delete(id: string): Promise<any> {
        
        const index = this.items.findIndex(item => item._id.toValue === id)

        this.items.splice(index, 1)
    }
}