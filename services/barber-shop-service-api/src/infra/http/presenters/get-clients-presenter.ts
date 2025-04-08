import { Client } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client";

export class GetListClientPresenter {
    
    static toHttp(client: Client) {

        return {
            id: client._id.toValue,
            name: client.name,
            email: client.email,
            password: client.password,
            cpf: client.cpf,
            birthDateAt: client.birthDateAt,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }

    }
}