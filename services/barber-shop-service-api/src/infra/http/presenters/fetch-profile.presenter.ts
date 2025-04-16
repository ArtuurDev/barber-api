import { Client } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client";

export class FetchProfileClientPresenter {
    
    static toHttp(client: Client) {

        return {
            name: client.name,
            email: client.email,
            birthDateAt: client.birthDateAt,
            createdAt: client.createdAt,
        }
    }
}