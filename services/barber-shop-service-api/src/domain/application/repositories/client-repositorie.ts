import { Client } from "../../enterprise/entities/client";

export interface ClientRepository {
    create(client: Client): Promise<any>
    find(): Promise<Client[] | [] >
    findById(id:string): Promise<Client | undefined>
    findByEmail(email: string): Promise<Client | undefined>
    findByCpf(cpf: string): Promise<Client | undefined>
    save(data: Client, id: string): Promise<Client | undefined>
    delete(id: string): Promise<Client | undefined>

}