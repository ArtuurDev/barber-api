import { Client } from "../../enterprise/entities/client";

export abstract class ClientRepository {
    abstract create(client: Client): Promise<any>
    abstract find(): Promise<Client[] | [] >
    abstract findById(id:string): Promise<Client | null>
    abstract findByEmail(email: string): Promise<Client | null>
    abstract findByPhone(phone: string): Promise<Client | null>
    abstract findByCpf(cpf: string): Promise<Client | null>
    abstract save(data: Client): Promise<any>
    abstract delete(id: string): Promise<any>

}