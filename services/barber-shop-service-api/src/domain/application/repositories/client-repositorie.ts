import { Client } from "../../enterprise/entities/client";

export interface ClientRepository {
    create(client: Client): Promise<any>
    findByEmail(email: string): Promise<Client | undefined>
    findByCpf(cpf: string): Promise<Client | undefined>

}