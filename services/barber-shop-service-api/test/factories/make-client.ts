import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { Client } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client";

export function makeClient(override: Partial<Client> = {}, id?: UniqueEntityId) {
    
    const client = Client.create({
        name: 'artur',
        cpf: '622.408.473-44',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '12323Amk@',
        phone: '(88) 99603-6330',
        birthDateAt: new Date(),
        permission: 'CLIENT',
        ...override
        
    }, id)
    
    return client

}