import { UniqueEntityId } from "../../core/entitys/unique-entity-id";
import { Client } from "../../domain/enterprise/entities/client";

export function makeClient(override: Partial<Client> = {}, id?: UniqueEntityId) {
    
    const client = Client.create({
        name: 'artur',
        cpf: '62240847344',
        email: 'arturcastrodossantos.com@gmail.com',
        password: '12323Amk@',
        phone: '88996036330',
        birthDateAt: new Date(),
        ...override
        
    }, id ?? new UniqueEntityId)
    console.log(client)
    return client

}