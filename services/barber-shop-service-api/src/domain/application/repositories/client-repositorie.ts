import { Client } from "../../enterprise/entities/client";

export interface ClientRepository {
    create(client: Client): Promise<any>
    find(): Promise<Client[] | [] >
    findByEmail(email: string): Promise<Client | undefined>
    findByCpf(cpf: string): Promise<Client | undefined>

}